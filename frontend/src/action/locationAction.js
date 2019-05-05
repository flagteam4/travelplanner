export const TOGGLE_LOCATION = 'toggle_location';

export const toggleLocation = (title) => ({
    type: TOGGLE_LOCATION,
    title
});

export const MOVE_LOCATION = 'move_location';

export const moveLocation = (oldIndex, newIndex) => ({
    type: MOVE_LOCATION,
    oldIndex,
    newIndex
});
