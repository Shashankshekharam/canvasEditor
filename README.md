# canvasEditor
to implement a simple canvas like editor with vanilla HTML Canvas, where users can select an image which will be placed in a mask within the canvas, and the users will be able to change the caption text and call to action with a text input. The user can also change the background colour of the template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

So before that you need to use commands like ---   npm install or if  there's a dependency resolution issue with package 
This can happen when different packages require conflicting versions of the same dependency.

To resolve this, you can try a few options:
Retry with --force or --legacy-peer-deps: You can try running npm install --force

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

The project has been deployed to Netlify. You can access it !
[here](https://664a1e22d8a3d0cf836cbf03--amazing-lamington-bee771.netlify.app/).

-------------------------------------------------------------------------------------------------------------------------------------------------------------------

# To implement the given requirements, we'll create a React functional component for the UI and a separate class for handling the canvas logic. We'll also utilize Tailwind CSS for styling.
so,
Step 1: Set Up the Project.(npx create-react-app canvas-editor
cd canvas-editor
npm install tailwindcss react-color)
then Step 2: Configure Tailwind CSS
Step 3: Create Canvas Class
Step 4: Create Editor Component and perform logic
Step 5: Integrate Canvas with Editor
Integrate the Canvas class with the Editor component to handle canvas logic.

Step 6: Implement Canvas Logic
Inside the Canvas class, implementing methods for handling template data, drawing text and images on the canvas, applying masking, etc.

Step 7: Implement Color Picker
here we have Integrate a color picker component (e.g., from react-color) and implement the logic to change the background color and text color based on user input.

Step 8: Implement Image Selection
lasltly we Implement image selection feature using the native <input type="file"> element or a file picker library like react-dropzone.


-------------
# canvasEditor
..
