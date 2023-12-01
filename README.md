# multilingual-wikipedia-test
This repository is designed for automated testing of language changes on Wikipedia pages using Playwright, JavaScript, and Docker. The test scenario focuses on verifying the language change functionality for logged-in users


**Test Case Title: Successful Language Switching of the "Wikipedia" Web Application Interface by an Authenticated User**

Test Case ID: TC-001

Preconditions:
The user is already authenticated in the Wikipedia system.
The user is on the homepage of the website.

Execution Steps:
1.The user clicks on the "Preferences" link in the top menu.
2.The system redirects the user to the settings page.
3.On the "User profile" tab in the "Internationalisation" section, the user selects a different language for the interface from the available options.
4.The user clicks the "Save" button, confirming the language change.
5.The system displays a message about the successful language change and updates the website interface.

Verifications:
After the language change, the system is displayed in the user-selected language.

Postconditions:
Restore the system to its initial state (return to the original language).
The website interface is displayed in the original language.


**Instructions for Running the Test:**

1. Start by cloning the project from GitHub using the following git clone command:
<pre>
git clone https://github.com/Vgryadushkin/multilingual-wikipedia-test.git
</pre>
2. In the root directory, create a file named .env and enter valid authentication data using the environment variables WIKIUSERNAME and WIKIPASSWORD. Provide an example:
<pre>
# File: .env
# Environment variables for authentication in Wikipedia test
WIKIUSERNAME=your_username
WIKIPASSWORD=your_password
</pre>
3. Build the Docker image with the following command in the terminal:
<pre>
docker build -t wikipedia-test-image .
</pre>
4. After creating the container, execute the following command to run the created image:
<pre>
docker run -it --rm wikipedia-test-image
</pre>
5. Once inside the container, enter the command to run the test:
<pre>
npx playwright test
</pre>
6. To exit the container, type:
<pre>
exit
</pre>
