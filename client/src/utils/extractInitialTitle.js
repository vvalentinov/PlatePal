export const extractTitle = (recipeType) => {
    if (recipeType === 'approved') {
        return 'Approved Recipes';
    } else if (recipeType === 'unapproved') {
        return 'Unapproved Recipes';
    } else {
        return 'All Recipes';
    }
};