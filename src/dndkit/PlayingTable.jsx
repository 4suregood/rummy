import React, { useState, useEffect, useRef } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCenter,
    rectIntersection,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    horizontalListSortingStrategy,
    rectSwappingStrategy
} from '@dnd-kit/sortable';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
//<DeleteOutlinedIcon />
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import ImageItem from './ImageItem';
import {
    generateDeck, shuffleDeck, dealCard, generateJoker, generateRummyDeck,
    dealCards, dataTypeChecker, belongToGroup, isNextCardValidForMeld, sortCards, sortRunWithJoker, isMeldSet, isWholeGroupRuns, isNextCardJokerReplacement
} from "../utils/helpers";
import HandContainer from './HandContainer'
import TopContainer from './TopContainer';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import DropContainer from './DropContainer';
import PickContainer from './PickContainer';
import LayingOffContainer from './LayingOffContainer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useResize from "../utils/useResize"
import { textAlign } from '@mui/system';

// A breakpoint is the range of predetermined screen sizes that have specific layout requirements.
// xs (extra-small): 0px or larger
// sm (small): 600px or larger
// md (medium): 960px or larger
// lg (large): 1280px or larger
// xl (extra-large): 1920px or larger

const PlayingTable = (props) => {

    console.log('Render PlayingTable');
    const theme = useTheme();
    // const theme = useContext(ThemeContext)
    // const isMobile = useMedia([theme.max('sm')])

    const availWidth = window.screen.availWidth;
    console.log('[PlayingTable] availWidth=', availWidth);
    const [deck, setDeck] = useState([])
    // const [hand, setHand] = useState([])
    const [topHand, setTopHand] = useState([])
    const [leftHand, setLeftHand] = useState([])
    const [rightHand, setRightHand] = useState([])
    const [imageWidth, setImageWidth] = useState("40px")
    const [imageHeight, setImageHeight] = useState("40px")
    const [message, setMessage] = useState('')
    const [meld, setMeld] = useState([])

    const elementRef = useRef(null);
    const [position, dimensions] = useResize(elementRef);
    // console.log('[PlayingTable] position=', position);
    console.log('[PlayingTable] dimensions=', dimensions);
    const [activeId, setActiveId] = useState();
    const [activeCard, setActiveCard] = useState();
    const [sourceContId, setSourceContId] = useState();
    const [disableDnD, setDisableDnD] = useState(false);
    const [overContId, setOverContId] = useState();

    const [items, setItems] = useState({
        layingOffContainer: [[]],
        pickContainer: [],
        dropContainer: [],
        handContainer: []
    });

    // A breakpoint is the range of predetermined screen sizes that have specific layout requirements.
    // xs (extra-small): 0px or larger
    // sm (small): 600px or larger
    // md (medium): 960px or larger
    // lg (large): 1280px or larger
    // xl (extra-large): 1920px or larger

    const sm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const xl = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    console.log('[PlayingTable] sm md lg xl=', sm, md, lg, xl);

    useEffect(() => {
        console.log('useEffect');
        const generateAndShuffleDeck = async () => {
            const tempDeck = await generateRummyDeck();
            if (tempDeck && tempDeck.length > 0) {
                console.log('[PlayingTable] 1 tempDeck.length=', tempDeck.length);
                setDeck(tempDeck);
                const tempDeck2 = await shuffleDeck(tempDeck);
                if (tempDeck2 && tempDeck2.length > 0) {
                    console.log('[PlayingTable] tempDeck2.length=', tempDeck2.length);
                    setDeck(tempDeck2);
                }
            }
        }

        generateAndShuffleDeck();

    }, [])

    useEffect(() => {
        console.log('useEffect2');
        if (deck && deck.length > 0) {

            console.log('useEffect3');

            let player1 = dealCards(deck, 15, true);
            // setHand(player1);
            let player2 = dealCards(deck, 14, false);
            setTopHand(player2);
            let player3 = dealCards(deck, 14, false);
            setLeftHand(player3);
            let player4 = dealCards(deck, 14, false);
            setRightHand(player4);

            setItems({
                layingOffContainer: [[]],
                pickContainer: deck,
                dropContainer: [],
                handContainer: sortCards(player1)
            })
        }

    }, [deck])

    useEffect(() => {
        console.log('[PlayingTable] useEffect4');
        // if (deck && deck.length > 0) {
        // setImageWidth(`${dimensions.width / 25}px`);

        // const imgWidth = (dimensions.width / 27).toFixed(2);
        // sm (small): 600px or larger
        // md (medium): 960px or larger
        // lg (large): 1280px or larger
        // xl (extra-large): 1920px or larger
        let imgWidth = 0;
        if (sm) {
            //<600px
            imgWidth = (availWidth / 50).toFixed(2);
        } else if (md) {
            //<960px
            imgWidth = (availWidth / 27).toFixed(2);
        } else if (lg) {
            //<1280px
            imgWidth = (availWidth / 40).toFixed(2);
        } else if (xl) {
            //<1920px
            imgWidth = (availWidth / 40).toFixed(2);
        } else {
            imgWidth = (availWidth / 40).toFixed(2);
        }
        console.log('[PlayingTable] ImageWidth=', imgWidth);
        setImageWidth(`${imgWidth}px`);

        //min-height: 100vh;
        let height = (324 / 223) * parseInt(imgWidth, 10);
        console.log('[PlayingTable] ImageHeight=', height);
        setImageHeight(height);
        // }

    }, [availWidth])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const cancelMeld = () => {
        setMessage("cancelMeld clicked!");
        const handResult = [...meld, ...items.handContainer]
        setItems((items) => ({
            ...items,
            layingOffContainer: [[]],
            handContainer: sortCards(handResult)
        }));
        setMeld([])
    }

    const createNewGroup = () => {
        setMessage("createNewGroup clicked!");
        const result = [...items.layingOffContainer, []];
        setItems((items) => ({
            ...items,
            layingOffContainer: result
        }));
    }

    // console.log('[PlayingTable] deck=', deck);
    //rectIntersection
    console.log('[PlayingTable] disableDnD=', disableDnD);
    console.log('[PlayingTable] window.screen=', window.screen);
    console.log('[PlayingTable] window.screen.orientation.type=', window.screen.orientation.type);



    return (
        <>
            {sm && (<Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">
                    Turn your phone sideways, like a wide picture, please.
                </Alert>
            </Stack>)
            }
            {!sm && <DndContext
                sensors={sensors}
                // collisionDetection={closestCenter}
                collisionDetection={rectIntersection}
                onDragStart={handleDragStart}
                // onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {/* <Box ref={elementRef} sx={{ flexGrow: 1 }}> */}
                <Box ref={elementRef} >
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                            <div>xs=2</div>
                        </Grid>
                        <Grid item xs={8}>
                            <TopContainer id="topContainer" items={topHand} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} imageHeight={imageHeight} />
                        </Grid>
                        <Grid item xs={2}>
                            <div>xs=2</div>
                        </Grid>

                        <Grid item xs={2}>
                            <LeftContainer id="leftContainer" items={leftHand} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} imageHeight={imageHeight} />
                        </Grid>
                        <Grid item xs={8}>
                            <LayingOffContainer id="layingOffContainer" items={items.layingOffContainer} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} imageHeight={imageHeight} disableDnD={disableDnD} />
                        </Grid>
                        <Grid item xs={2}>
                            <RightContainer id="rightContainer" items={rightHand} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} imageHeight={imageHeight} />
                        </Grid>

                        <Grid item xs={2}>
                            <div>xs=2</div>
                        </Grid>
                        <Grid item xs={2}>
                            <PickContainer id="pickContainer" items={items.pickContainer} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} disableDnD={disableDnD} />
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ textAlign: "center" }}>Your hand</div>
                        </Grid>
                        <Grid item xs={2}>
                            <DropContainer id="dropContainer" items={items.dropContainer} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} disableDnD={disableDnD} />
                        </Grid>
                        <Grid item xs={2}>
                            <div>xs=2</div>
                        </Grid>

                        <Grid item xs={2}>
                            <div>xs=2</div>
                        </Grid>
                        <Grid item xs={8}>
                            <HandContainer id="handContainer" items={items.handContainer} maxHeight={dimensions.height} maxWidth={dimensions.width}
                                imageWidth={imageWidth} imageHeight={imageHeight} />
                        </Grid>
                        <Grid item xs={2}>
                            <Stack direction="column" spacing={1}>
                                <Button onClick={() => createNewGroup()} variant="contained" size="small" startIcon={<AddCircleIcon />}>
                                    Create Group
                                </Button>
                                <Button onClick={() => cancelMeld()} variant="contained" size="small" startIcon={<CancelIcon />}>
                                    Cancel Meld
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {message && <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert variant="filled" severity="error">
                                    {message}
                                </Alert>
                            </Stack>
                            }
                        </Grid>
                    </Grid>
                </Box>
                <DragOverlay dropAnimation={null}>{activeId ? <ImageItem id={activeId} card={activeCard} imageWidth={imageWidth} /> : null}</DragOverlay>
            </DndContext >
            }
        </>
    );

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;
        console.log('handleDragStart id=', id);
        setActiveId(id);
        // hand or pick
        const { pickContainer, handContainer, dropContainer, layingOffContainer } = items;
        let card = handContainer.find((card) => { return active.id === card.id });
        console.log('handleDragStart handContainer card=', card);
        if (card) {
            setActiveCard(card);
            setSourceContId('handContainer');
        } else {
            card = pickContainer.find((card) => { return active.id === card.id });
            if (card) {
                console.log('handleDragStart pickContainer card=', card);
                setActiveCard(card);
                setSourceContId('pickContainer');
            } else {
                card = dropContainer.find((card) => { return active.id === card.id });
                if (card) {
                    console.log('handleDragStart dropContainer card=', card);
                    setActiveCard(card);
                    setSourceContId('dropContainer');
                } else {
                    let ind = 0;
                    const cardGroup = layingOffContainer.find((arr, index) => {
                        ind = index;
                        return arr.find((card) => { return active.id === card.id });
                    });
                    card = cardGroup.find((card) => { return active.id === card.id });
                    console.log('handleDragStart groupContainer card=', card);
                    setActiveCard(card);
                    setSourceContId(`group${ind}`);

                }
            }
        }
        console.log('handleDragStart sourceContId=', sourceContId);
    }

    // function handleDragOver(event) {
    //     console.log('handleDragOver event=', event);
    //     const { active, over, draggingRect } = event;
    //     const { id } = active;
    //     const { id: overId } = over;
    //     console.log('handleDragOver id=', id);
    //     console.log('handleDragOver overId=', overId);
    //     if (overId === 'dropContainer') {
    //         setOverContId('dropContainer');
    //     }
    // }

    function handleDragEnd(event) {
        const { active, over } = event || {};
        console.log('handleDragEnd event=', event);
        const { id } = active || {};
        const { id: overId } = over || {};
        console.log('handleDragEnd overId=', overId);
        console.log('handleDragEnd sourceContId=', sourceContId);
        dataTypeChecker(overId, true);
        const str = typeof overId === 'string';
        console.log('handleDragEnd str=', str);
        const b = typeof overId === 'string' && overId.indexOf('group') > -1;
        console.log('handleDragEnd b=', b);
        if (overId === 'dropContainer' && sourceContId === 'handContainer') {
            // drop a card and finish turn!
            if (active.id !== over.id) {
                const { dropContainer, handContainer } = items;
                let result = [...dropContainer];
                let handResult = [...handContainer];
                const oldIndex = dropContainer.findIndex((card) => { return active.id === card.id });
                console.log('handleDragEnd oldIndex=', oldIndex);
                if (oldIndex !== -1) {
                    const newIndex = dropContainer.findIndex((card) => { return over.id === card.id });
                    console.log('handleDragEnd newIndex=', newIndex);
                    result = arrayMove(dropContainer, oldIndex, newIndex)
                } else {
                    // find it in hand
                    const index = handContainer.findIndex((card) => { return active.id === card.id });
                    const card = handContainer.find((card) => { return active.id === card.id });
                    console.log('handleDragEnd card=', card);

                    if (index > -1) { // only splice array when item is found
                        handResult.splice(index, 1); // 2nd parameter means remove one item only
                    }
                    // add 
                    result.push(card);
                }

                setItems((items) => ({
                    ...items,
                    handContainer: handResult,
                    dropContainer: result
                }));
                // setDisableDnD(true);
            }
            // } else if (overId === 'layingOffContainer') {
        } else if (typeof overId === 'string' && overId.indexOf('group') > -1) {
            console.log('handleDragEnd group!');
            if (active.id !== over.id) {
                const groupIndexStr = overId.substring(5);
                console.log('handleDragEnd groupIndexStr=', groupIndexStr);
                const { layingOffContainer, handContainer } = items;
                let result = [...layingOffContainer]; // array of arrays!
                console.log('handleDragEnd result.length=', result.length);
                let handResult = [...handContainer];
                const index = handContainer.findIndex((card) => { return active.id === card.id });
                const card = handContainer.find((card) => { return active.id === card.id });
                if (index > -1) { // only splice array when item is found
                    let temp = [];
                    setMessage(null);
                    if (result.length > 0) {
                        // get selected!!!
                        const groupIndex = parseInt(groupIndexStr, 10);
                        temp = result[groupIndex];
                        if (isMeldSet([...temp, card])) {
                            temp.push(card);
                            console.log('handleDragEnd temp.length=', temp.length);
                            handResult.splice(index, 1);
                            const jokerIndex = temp.findIndex((card) => { return card.rank === 'joker' });
                            if (jokerIndex !== -1 && temp.length === 5) {
                                // swap joker
                                const jokerCard = temp.find((card) => { return card.rank === 'joker' });
                                temp.splice(jokerIndex, 1);
                                handResult.push(jokerCard)
                                // remove joker from meld to avoid duplicate when Cancel Meld
                                const t = [...meld];
                                const jIndex = t.findIndex((card) => { return card.id === jokerCard.id });
                                t.splice(jIndex, 1);
                                setMeld(t);
                            }
                            setMeld(meld => [...meld, card]);
                        } else if (isWholeGroupRuns([...temp], card)) {
                            let jokerReplacement = false;
                            const jokerIndex = temp.findIndex((card) => { return card.rank === 'joker' });
                            if (jokerIndex !== -1 && temp.length > 2) {
                                jokerReplacement = isNextCardJokerReplacement([...temp], card);
                            }
                            temp.push(card);
                            console.log('handleDragEnd temp.length=', temp.length);
                            handResult.splice(index, 1);
                            if (jokerReplacement) {
                                // swap joker
                                const jokerCard = temp.find((card) => { return card.rank === 'joker' });
                                temp.splice(jokerIndex, 1);
                                handResult.push(jokerCard)
                                // remove joker from meld to avoid duplicate when Cancel Meld
                                const t = [...meld];
                                const jIndex = t.findIndex((card) => { return card.id === jokerCard.id });
                                t.splice(jIndex, 1);
                                setMeld(t);
                            }
                            temp = sortRunWithJoker(temp);
                            setMeld(meld => [...meld, card]);

                        } else {
                            setMessage("not a group!");
                        }
                    } else {
                        temp.push(card);
                        result.push(temp);
                        handResult.splice(index, 1);
                    }
                } else {
                    console.log('handleDragEnd group dnd!');



                }

                setItems((items) => ({
                    ...items,
                    handContainer: handResult,
                    layingOffContainer: result
                }));
            }
        } else if (sourceContId === 'pickContainer') {
            // pick a new card
            const { pickContainer, handContainer } = items;
            let result = [...pickContainer];
            let handResult = [...handContainer];
            // remove id from pic
            const index = pickContainer.findIndex((card) => { return active.id === card.id });
            const card = pickContainer.find((card) => { return active.id === card.id });
            if (index > -1) { // only splice array when item is found
                console.log('handleDragEnd BEF result.length=', result.length);
                result.splice(index, 1); // 2nd parameter means remove one item only
                console.log('handleDragEnd AFT result.length=', result.length);
                card.faceUp = true;
            }
            // add card to hand
            handResult.push(card);

            setItems((items) => ({
                ...items,
                handContainer: handResult,
                pickContainer: result
            }));
        } else if (sourceContId === 'dropContainer') {
            // player lay off and likes the drop card!
            const { dropContainer, handContainer } = items;
            let result = [...dropContainer];
            let handResult = [...handContainer];
            // remove id from pic
            const index = dropContainer.findIndex((card) => { return active.id === card.id });
            const card = dropContainer.find((card) => { return active.id === card.id });
            if (index > -1) { // only splice array when item is found
                console.log('handleDragEnd BEF result.length=', result.length);
                result.splice(index, 1); // 2nd parameter means remove one item only
                console.log('handleDragEnd AFT result.length=', result.length);
                //card.faceUp = true;
            }
            // add card to hand
            handResult.push(card);

            setItems((items) => ({
                ...items,
                handContainer: handResult,
                dropContainer: result
            }));

        } else if (sourceContId && sourceContId.indexOf('group') > -1) {
            const groupIndexStr = sourceContId.substring(5);
            console.log('handleDragEnd gCont groupIndexStr=', groupIndexStr);
            const groupIndex = parseInt(groupIndexStr, 10);
            const { layingOffContainer } = items;
            // let result = [...layingOffContainer]; // array of arrays!
            const gCont = layingOffContainer[groupIndex];
            const oldIndex = gCont.findIndex((card) => { return active.id === card.id });
            console.log('handleDragEnd gCont oldIndex=', oldIndex);
            const newIndex = gCont.findIndex((card) => { return over.id === card.id });
            console.log('handleDragEnd gCont newIndex=', newIndex);
            const result = arrayMove(gCont, oldIndex, newIndex);
            //.splice(start, deleteCount, item1);
            console.log('handleDragEnd gCont result=', result);
            // const temp = layingOffContainer.splice(groupIndex, 1, result);
            const temp = layingOffContainer.map((arr, index) => index === groupIndex ? result : arr);
            console.log('handleDragEnd gCont temp=', temp);
            setItems((items) => ({
                ...items,
                layingOffContainer: temp
            }));
        } else {
            if (active && over && active.id !== over.id) {
                const { handContainer } = items;
                const oldIndex = handContainer.findIndex((card) => { return active.id === card.id });
                console.log('handleDragEnd oldIndex=', oldIndex);
                const newIndex = handContainer.findIndex((card) => { return over.id === card.id });
                console.log('handleDragEnd newIndex=', newIndex);

                setItems((items) => ({
                    ...items,
                    handContainer: arrayMove(handContainer, oldIndex, newIndex)
                }));
            }
        }
        setActiveId(null);
        setActiveCard(null);
        setSourceContId(null);
    }
}

export default PlayingTable;