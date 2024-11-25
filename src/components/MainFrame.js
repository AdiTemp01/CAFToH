import React, { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import Area from './Area';

const MainFrame = () => {
    const { state, setState, moves, setMoves } = useContext(MainContext);

    const onDragEnd = ({ source, destination }) => {
        if (!destination) return;

        // Prevent rearrangement within the same peg
        if (source.droppableId === destination.droppableId) {
            return;
        }

        // Get elements from source and destination
        const srcElem = state[source.droppableId].disks[source.index];
        const destElem = state[destination.droppableId].disks[0]; // Only the top of the destination peg

        // Validate the move
        let movable = false;

        if (!destElem || srcElem.value < destElem.value) {
            movable = true;
        }

        // If move is valid, update the state
        if (movable) {
            const tmpDisk = state[source.droppableId].disks[source.index];

            setState((prev) => {
                // Remove disk from source peg
                prev[source.droppableId].disks.splice(source.index, 1);

                // Add disk to the top of the destination peg
                prev[destination.droppableId].disks.unshift(tmpDisk);

                setMoves(moves + 1); // Increment the move counter
                return { ...prev };
            });
        }
    };

    return (
        <div className="md:grid grid-cols-3 gap-8">
            <DragDropContext onDragEnd={onDragEnd}>
                {_.map(state, (data, key) => (
                    <Area data={data} dataKey={key} key={key} />
                ))}
            </DragDropContext>
        </div>
    );
};

export default MainFrame;
