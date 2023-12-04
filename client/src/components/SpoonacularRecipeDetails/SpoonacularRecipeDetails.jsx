import styles from './SpoonacularRecipeDetails.module.css';

import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { getRecipeDetails } from '../../services/spoonacularService';

import BackToTopArrow from '../BackToTopArrow/BackToTopArrow';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons';

const SpoonacularRecipeDetails = () => {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState();
    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        getRecipeDetails(recipeId)
            .then(res => {
                setRecipe(res.result);
                setInstructions(res.instructions);
            })
            .catch(err => console.log(err.message));
    }, [recipeId]);

    // const recipe = { "vegetarian": false, "vegan": false, "glutenFree": true, "dairyFree": false, "veryHealthy": false, "cheap": false, "veryPopular": false, "sustainable": false, "lowFodmap": false, "weightWatcherSmartPoints": 2, "gaps": "no", "preparationMinutes": -1, "cookingMinutes": -1, "aggregateLikes": 6, "healthScore": 6, "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit", "license": "CC BY 3.0", "sourceName": "Foodista", "pricePerServing": 115.13, "extendedIngredients": [{ "id": 5062, "aisle": "Meat", "image": "chicken-breasts.png", "consistency": "SOLID", "name": "chicken breast", "nameClean": "chicken breast", "original": "500 grams boneless chicken breast", "originalName": "boneless chicken breast", "amount": 500.0, "unit": "grams", "meta": ["boneless"], "measures": { "us": { "amount": 1.102, "unitShort": "lb", "unitLong": "pounds" }, "metric": { "amount": 500.0, "unitShort": "g", "unitLong": "grams" } } }, { "id": 2009, "aisle": "Spices and Seasonings", "image": "chili-powder.jpg", "consistency": "SOLID", "name": "chili powder", "nameClean": "chili powder", "original": "2-3 tsp chili powder", "originalName": "chili powder", "amount": 2.0, "unit": "tsp", "meta": [], "measures": { "us": { "amount": 2.0, "unitShort": "tsps", "unitLong": "teaspoons" }, "metric": { "amount": 2.0, "unitShort": "tsps", "unitLong": "teaspoons" } } }, { "id": 10111215, "aisle": "Produce", "image": "garlic-paste.png", "consistency": "SOLID", "name": "ginger and garlic paste", "nameClean": "garlic paste", "original": "4 tbsp Ginger and Garlic paste", "originalName": "Ginger and Garlic paste", "amount": 4.0, "unit": "tbsp", "meta": [], "measures": { "us": { "amount": 4.0, "unitShort": "Tbsps", "unitLong": "Tbsps" }, "metric": { "amount": 4.0, "unitShort": "Tbsps", "unitLong": "Tbsps" } } }, { "id": 2047, "aisle": "Spices and Seasonings", "image": "salt.jpg", "consistency": "SOLID", "name": "salt", "nameClean": "table salt", "original": "½ tbsp. salt", "originalName": "salt", "amount": 0.5, "unit": "tbsp", "meta": [], "measures": { "us": { "amount": 0.5, "unitShort": "Tbsps", "unitLong": "Tbsps" }, "metric": { "amount": 0.5, "unitShort": "Tbsps", "unitLong": "Tbsps" } } }, { "id": 2043, "aisle": "Spices and Seasonings", "image": "turmeric.jpg", "consistency": "SOLID", "name": "turmeric powder", "nameClean": "turmeric", "original": "1/4 tsp Turmeric powder", "originalName": "Turmeric powder", "amount": 0.25, "unit": "tsp", "meta": [], "measures": { "us": { "amount": 0.25, "unitShort": "tsps", "unitLong": "teaspoons" }, "metric": { "amount": 0.25, "unitShort": "tsps", "unitLong": "teaspoons" } } }, { "id": 1116, "aisle": "Milk, Eggs, Other Dairy", "image": "plain-yogurt.jpg", "consistency": "SOLID", "name": "yogurt", "nameClean": "yogurt", "original": "4 tbsp yogurt", "originalName": "yogurt", "amount": 4.0, "unit": "tbsp", "meta": [], "measures": { "us": { "amount": 4.0, "unitShort": "Tbsps", "unitLong": "Tbsps" }, "metric": { "amount": 4.0, "unitShort": "Tbsps", "unitLong": "Tbsps" } } }], "id": 637876, "title": "Chicken 65", "readyInMinutes": 45, "servings": 6, "sourceUrl": "http://www.foodista.com/recipe/G4XPLKBW/chicken-65-chicken-marinaded-in-traditional-indian-spices-and-deep-fried", "image": "https://spoonacular.com/recipeImages/637876-556x370.jpg", "imageType": "jpg", "summary": "Chicken 65 could be just the <b>gluten free</b> recipe you've been looking for. This hor d'oeuvre has <b>121 calories</b>, <b>19g of protein</b>, and <b>3g of fat</b> per serving. For <b>$1.15 per serving</b>, this recipe <b>covers 11%</b> of your daily requirements of vitamins and minerals. This recipe serves 6. Head to the store and pick up salt, chili powder, yogurt, and a few other things to make it today. 6 people have made this recipe and would make it again. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Overall, this recipe earns a <b>not so spectacular spoonacular score of 39%</b>. Similar recipes are <a href=\"https://spoonacular.com/recipes/i-aint-chicken-chicken-crispy-roasted-chicken-breasts-with-orange-and-cardamom-1243251\">I Ain't Chicken Chicken: Crispy Roasted Chicken Breasts with Orange and Cardamom</a>, <a href=\"https://spoonacular.com/recipes/i-aint-chicken-chicken-crispy-roasted-chicken-breasts-with-orange-and-cardamom-1230059\">I Ain't Chicken Chicken: Crispy Roasted Chicken Breasts with Orange and Cardamom</a>, and <a href=\"https://spoonacular.com/recipes/i-aint-chicken-chicken-crispy-roasted-chicken-breasts-with-orange-and-cardamom-1224321\">I Ain't Chicken Chicken: Crispy Roasted Chicken Breasts with Orange and Cardamom</a>.", "cuisines": [], "dishTypes": ["antipasti", "starter", "snack", "appetizer", "antipasto", "hor d'oeuvre"], "diets": ["gluten free"], "occasions": [], "winePairing": { "pairedWines": ["sparkling wine", "sparkling rose"], "pairingText": "Antipasti on the menu? Try pairing with Sparkling Wine and Sparkling rosé. If you're serving a selection of appetizers, you can't go wrong with these. Both are very food friendly and complement a variety of flavors. You could try McBride Sisters Brut rosé. Reviewers quite like it with a 4.8 out of 5 star rating and a price of about 24 dollars per bottle.", "productMatches": [{ "id": 432942, "title": "McBride Sisters Brut Rose", "description": "This sparkling wine exhibits a superb, long finish, backed by crisp acidity with complex aromas of red cherry, strawberry and floral notes.", "price": "$23.989999771118164", "imageUrl": "https://spoonacular.com/productImages/432942-312x231.jpg", "averageRating": 0.9599999785423279, "ratingCount": 7.0, "score": 0.9145454330877825, "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fmcbride-sisters-brut-rose%2F213437" }] }, "instructions": "<ol><li>Take a large bowl mix in the ginger and garlic paste, yogurt, red chilly powder, turmeric powder, and salt.</li><li>Mix well to from smooth and thick paste, add the chicken pieces to the masala paste and  marinaded for 4 hours.</li><li>Heat enough oil in a pan to deep fry the marinaded chicken pieces. Deep fry the chicken pieces in batches till crisp and golden color.</li><li>Note: The taste of the Chicken 65 depends mainly on the amount of time it gets marinated in the masala, it is best to marinate the chicken pieces the day before.</li></ol>", "analyzedInstructions": [{ "name": "", "steps": [{ "number": 1, "step": "Take a large bowl mix in the ginger and garlic paste, yogurt, red chilly powder, turmeric powder, and salt.", "ingredients": [{ "id": 2043, "name": "turmeric", "localizedName": "turmeric", "image": "turmeric.jpg" }, { "id": 2009, "name": "chili powder", "localizedName": "chili powder", "image": "chili-powder.jpg" }, { "id": 10111215, "name": "garlic paste", "localizedName": "garlic paste", "image": "garlic-paste.png" }, { "id": 11216, "name": "ginger", "localizedName": "ginger", "image": "ginger.png" }, { "id": 1116, "name": "yogurt", "localizedName": "yogurt", "image": "plain-yogurt.jpg" }, { "id": 2047, "name": "salt", "localizedName": "salt", "image": "salt.jpg" }], "equipment": [{ "id": 404783, "name": "bowl", "localizedName": "bowl", "image": "bowl.jpg" }] }, { "number": 2, "step": "Mix well to from smooth and thick paste, add the chicken pieces to the masala paste and  marinaded for 4 hours.", "ingredients": [{ "id": 1005006, "name": "chicken pieces", "localizedName": "chicken pieces", "image": "chicken-parts.jpg" }], "equipment": [], "length": { "number": 240, "unit": "minutes" } }, { "number": 3, "step": "Heat enough oil in a pan to deep fry the marinaded chicken pieces. Deep fry the chicken pieces in batches till crisp and golden color.Note: The taste of the Chicken 65 depends mainly on the amount of time it gets marinated in the masala, it is best to marinate the chicken pieces the day before.", "ingredients": [{ "id": 1005006, "name": "chicken pieces", "localizedName": "chicken pieces", "image": "chicken-parts.jpg" }, { "id": 0, "name": "chicken", "localizedName": "chicken", "image": "whole-chicken.jpg" }, { "id": 4582, "name": "cooking oil", "localizedName": "cooking oil", "image": "vegetable-oil.jpg" }], "equipment": [{ "id": 404645, "name": "frying pan", "localizedName": "frying pan", "image": "pan.png" }] }] }], "originalId": null, "spoonacularScore": 48.641849517822266, "spoonacularSourceUrl": "https://spoonacular.com/chicken-65-637876" };

    // const instructions = [{ "name": "Some Name Here", "steps": [{ "number": 1, "step": "Take a large bowl mix in the ginger and garlic paste, yogurt, red chilly powder, turmeric powder, and salt.", "ingredients": [{ "id": 2043, "name": "turmeric", "localizedName": "turmeric", "image": "turmeric.jpg" }, { "id": 2009, "name": "chili powder", "localizedName": "chili powder", "image": "chili-powder.jpg" }, { "id": 10111215, "name": "garlic paste", "localizedName": "garlic paste", "image": "garlic-paste.png" }, { "id": 11216, "name": "ginger", "localizedName": "ginger", "image": "ginger.png" }, { "id": 1116, "name": "yogurt", "localizedName": "yogurt", "image": "plain-yogurt.jpg" }, { "id": 2047, "name": "salt", "localizedName": "salt", "image": "salt.jpg" }], "equipment": [{ "id": 404783, "name": "bowl", "localizedName": "bowl", "image": "bowl.jpg" }] }, { "number": 2, "step": "Mix well to from smooth and thick paste, add the chicken pieces to the masala paste and  marinaded for 4 hours.", "ingredients": [{ "id": 1005006, "name": "chicken pieces", "localizedName": "chicken pieces", "image": "chicken-parts.jpg" }], "equipment": [], "length": { "number": 240, "unit": "minutes" } }, { "number": 3, "step": "Heat enough oil in a pan to deep fry the marinaded chicken pieces. Deep fry the chicken pieces in batches till crisp and golden color.Note: The taste of the Chicken 65 depends mainly on the amount of time it gets marinated in the masala, it is best to marinate the chicken pieces the day before.", "ingredients": [{ "id": 1005006, "name": "chicken pieces", "localizedName": "chicken pieces", "image": "chicken-parts.jpg" }, { "id": 0, "name": "chicken", "localizedName": "chicken", "image": "whole-chicken.jpg" }, { "id": 4582, "name": "cooking oil", "localizedName": "cooking oil", "image": "vegetable-oil.jpg" }], "equipment": [{ "id": 404645, "name": "frying pan", "localizedName": "frying pan", "image": "pan.png" }] }] }];

    useEffect(() => {
        if (recipe) {
            const recipeSummaryElement = document.getElementById('recipeSummary');
            if (recipeSummaryElement) {
                recipeSummaryElement.innerHTML = recipe.summary;
            }
        }
    }, [recipe]);

    return (
        <section>
            {recipe && (
                <>
                    <div className={styles.recipeContainer}>
                        <Image src={recipe.image} />
                        <Card className={styles.recipeSummaryCard}>
                            <Card.Header className={styles.recipeSummaryCardHeader}>
                                {recipe.title} - <Link target='_blank' to={recipe.sourceUrl}>{recipe.sourceName}</Link>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text id='recipeSummary'></Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className={styles.recipePropertiesContainer}>
                        <div className={styles.recipeProperty}>
                            <span>
                                <FontAwesomeIcon icon={faClock} className='me-2' />
                                Prep Time: {recipe.readyInMinutes} minutes
                            </span>
                        </div>
                        <div className={styles.recipeProperty}>
                            <span>
                                <FontAwesomeIcon icon={faUtensils} className='me-2' />
                                Servings: {recipe.servings} servings
                            </span>
                        </div>
                    </div>
                    {recipe.extendedIngredients && (
                        <>
                            <h2 className='text-center text-white text-uppercase'>Ingredients</h2>
                            <div className={styles.ingredientsContainer}>
                                {recipe.extendedIngredients.map((x, index) => (
                                    <Card key={index} className={styles.ingredientsCard}>
                                        <Card.Img variant="top" src={`https://spoonacular.com/cdn/ingredients_250x250/${x.image}`} />
                                        <Card.Body>
                                            <Card.Title>{x.original}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                ))}

                            </div>
                        </>
                    )}
                    {instructions.length > 0 && (
                        <>
                            <h2 className='text-center text-white text-uppercase mt-5 mb-3'>Instructions</h2>
                            {instructions.map((x, index) => (
                                <div key={index} className={styles.instructionCardContainer}>
                                    <Card className={styles.instructionCard}>
                                        {x.name && <h3>{x.name}</h3>}
                                        {x.steps.length > 0 && (
                                            <div className={styles.stepsContainer} >
                                                {x.steps.map(y => (
                                                    <Card key={y.number} className={styles.stepCard}>
                                                        <p>{y.number}. {y.step}</p>
                                                        <div className={styles.equipmentContainer}>
                                                            {y.equipment.map(equipment =>
                                                                <Card key={equipment.id} className={styles.equipmentCard}>
                                                                    <Card.Img
                                                                        variant="top"
                                                                        src={`https://spoonacular.com/cdn/equipment_250x250/${equipment.image}`} />
                                                                    <Card.Body>
                                                                        <Card.Title>{equipment.name}</Card.Title>
                                                                    </Card.Body>
                                                                </Card>
                                                            )}
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </Card>
                                </div>
                            ))}
                        </>
                    )}

                    {recipe.winePairing?.pairedWines?.length > 0 && (
                        <>
                            <h3 className='text-center text-white mb-3'>Wine Pairing</h3>
                            <div className={styles.winePairingContainer}>
                                <Card className={styles.winePairingCard}>
                                    <Card.Body>
                                        <Card.Text>
                                            {recipe.winePairing.pairingText}
                                        </Card.Text>
                                        {
                                            recipe.winePairing.productMatches.map(x =>
                                                <div className={styles.wineContainer} key={x.id}>
                                                    <h3>{x.title}</h3>
                                                    <h4>{x.description}</h4>
                                                    <img src={x.imageUrl} alt="" />
                                                </div>
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )}
                </>
            )}
            <BackToTopArrow />
        </section>
    )
};

export default SpoonacularRecipeDetails;