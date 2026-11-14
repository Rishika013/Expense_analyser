What did you predict for Warmup.js, and what did it print? Explain the first line and the error from Part B.

I predicted that the first line would print undefined because of JS Hoisting. When I ran the program, it printed undefined because we declare a variable with var, the var declaration is hoisted to the top, but it is initialized with value of underfined.



Why did Loop finished print before Async read finished? Who did the reading while your loop was running?

Loop finished printed before Async read finished because fs.readFile() is asynchronous and does not block the execution of the remaining code.



How does tracker remember spent after createBudgetTracker has returned?

The budget tracker remembers the spent amount because of a closure. The inner function maintains access to the spent variable declared inside createBudgetTracker(), even after the outer function has returned.



What does the ^ in front of the lodash version in package.json mean, and why is package-lock.json created?

The ^ symbol before the lodash version in package.json means npm can install compatible newer minor and patch versions within the same major version.
The package-lock.json file saves the exact versions of the packages installed in the project. It helps ensure that the same package versions are used when someone installs the project on another computer.
