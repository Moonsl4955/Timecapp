class FormController {
    constructor(UserInput) {
        this.UserInput = UserInput;
    }

    async saveUserInput(req, res) {
        try {
            const { nickname, email, content } = req.body;

            // Create a new user input instance
            const userInput = new this.UserInput({
                nickname,
                email,
                content
            });

            // Save the user input to the database
            await userInput.save();

            // Send a success response
            res.status(201).json({ message: 'User input saved successfully!' });
        } catch (error) {
            console.error('Error saving user input:', error);
            res.status(500).json({ message: 'An error occurred while saving user input.' });
        }
    }
}

export default FormController;