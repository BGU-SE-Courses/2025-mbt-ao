/* @provengo summon ctrl */



/**
 * List of events "of interest" that we want test suites to cover.
 */

const make2wayGoals = function() {
    let g = [];
    const user_count = 25;
    const admin_count = 15;

    for (let i = 1; i <= user_count; i++) {
        for (let j = 1; j <= admin_count; j++) {
            g.push(Ctrl.markEvent(`${i},${j},userSession`))
            g.push(Ctrl.markEvent(`${i},${j},adminDeleteAProduct`))
        }
    }
    return g;
}


const makeDomainSpecificGoals = function(){
    return [Ctrl.markEvent("adminDeleteAProduct"), //is somewhere in the test suite
        Ctrl.markEvent("searchForProduct -> adminDeleteAProduct"), //somewhere in the test suite after the user search product
        Ctrl.markEvent("searchForProduct -> addProductToWishlist -> adminDeleteAProduct")]// after the user search product and add product to wishlist
}


// const GOALS = makeDomainSpecificGoals();
const GOALS = make2wayGoals();


/**
 * Ranks test suites by how many events from the GOALS array were met.
 * The more goals are met, the higher the score.
 * 
 * It make no difference if a goal was met more then once.
 *
 * @param {Event[][]} ensemble The test suite to be ranked.
 * @returns Number of events from GOALS that have been met.
 */
function rankByMetGoals( ensemble ) {
    const unreachedGoals = [];
    for ( let idx=0; idx<GOALS.length; idx++ ) {
        unreachedGoals.push(GOALS[idx]);
    }

    for (let testIdx = 0; testIdx < ensemble.length; testIdx++) {
        let test = ensemble[testIdx];
        //print in javascript
        for (let eventIdx = 0; eventIdx < test.length; eventIdx++) {
            let event = test[eventIdx];
            for (let ugIdx=unreachedGoals.length-1; ugIdx >=0; ugIdx--) {
                let unreachedGoal = unreachedGoals[ugIdx];
                if ( unreachedGoal.contains(event) ) {
                    unreachedGoals.splice(ugIdx,1);
                }
            }
        }
    }

    return GOALS.length-unreachedGoals.length;
}

/**
 * Ranks potential test suites based on the percentage of goals they cover.
 * Goal events are defined in the GOALS array above. An ensemble with rank
 * 100 covers all the goal events.
 *
 * Multiple ranking functions are supported - to change ranking function,
 * use the `ensemble.ranking-function` configuration key, or the 
 * --ranking-function <functionName> command-line parameter.
 *
 * @param {Event[][]} ensemble the test suite/ensemble to be ranked
 * @returns the percentage of goals covered by `ensemble`.
 */
 function rankingFunction(ensemble) {
    
    // How many goals did `ensemble` hit?
    const metGoalsCount = rankByMetGoals(ensemble);
    // What percentage of the goals did `ensemble` cover?
    const metGoalsPercent = metGoalsCount/GOALS.length;

    return metGoalsPercent * 100; // convert to human-readable percentage
}

