import { useParams } from 'react-router-dom';

const Recipes = () => {
    const { category } = useParams();
    return <h2>All Recipes {category}!</h2>;
};

export default Recipes;