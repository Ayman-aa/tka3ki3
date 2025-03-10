def run_quiz(questions_data):

    correct_count = 0
    incorrect_count = 0
    wrong_answers = []
    
    print("=== STAR WARS QUIZ ===")
    print("Answer the following questions about Star Wars!\n")
    
    for question_dict in questions_data:
        question = question_dict["question"]
        correct_answer = question_dict["answer"]
        
        user_answer = input(f"{question} ")
        
        if user_answer.lower() == correct_answer.lower():
            print("Correct! ✅")
            correct_count += 1
        else:
            print("Incorrect! ❌")
            incorrect_count += 1
            # Store the wrong answer information
            wrong_answers.append({
                "question": question,
                "user_answer": user_answer,
                "correct_answer": correct_answer
            })
        print()  
    
    return correct_count, incorrect_count, wrong_answers

def display_results(correct_count, incorrect_count, wrong_answers):

    total_questions = correct_count + incorrect_count
    
    print("=== QUIZ RESULTS ===")
    print(f"You answered {correct_count} out of {total_questions} questions correctly!")
    print(f"Correct answers: {correct_count}")
    print(f"Incorrect answers: {incorrect_count}")
    
    score_percentage = (correct_count / total_questions) * 100

    if score_percentage == 100:
        print("\nPerfect score! The Force is strong with you!")
    elif score_percentage >= 80:
        print("\nGreat job! You're on your way to becoming a Jedi Master!")
    elif score_percentage >= 60:
        print("\nGood effort! A bit more training and you'll be ready to face the Sith!")
    else:
        print("\nYou need more training, young Padawan.")

    if wrong_answers:
        print("\n=== QUESTIONS YOU MISSED ===")
        for i, wrong in enumerate(wrong_answers, 1):
            print(f"{i}. Question: {wrong['question']}")
            print(f"   Your answer: {wrong['user_answer']}")
            print(f"   Correct answer: {wrong['correct_answer']}")
            print()
    
    # Ask to play again if they had more than 3 wrong answers
    play_again = False
    if incorrect_count > 3:
        print("You had more than 3 wrong answers.")
        response = input("Would you like to play again? (yes/no): ")
        play_again = response.lower() in ['yes', 'y']
    
    return play_again

def main():
    data = [
        {
            "question": "What is Baby Yoda's real name?",
            "answer": "Grogu"
        },
        {
            "question": "Where did Obi-Wan take Luke after his birth?",
            "answer": "Tatooine"
        },
        {
            "question": "What year did the first Star Wars movie come out?",
            "answer": "1977"
        },
        {
            "question": "Who built C-3PO?",
            "answer": "Anakin Skywalker"
        },
        {
            "question": "Anakin Skywalker grew up to be who?",
            "answer": "Darth Vader"
        },
        {
            "question": "What species is Chewbacca?",
            "answer": "Wookiee"
        }
    ]
    
    play = True
    while play:
        # Run the quiz
        correct, incorrect, wrong = run_quiz(data)
        
        # Display results and check if user wants to play again
        play = display_results(correct, incorrect, wrong)
        
        if play:
            print("\nLet's try again!\n")
        else:
            print("\nThank you for playing the Star Wars Quiz!")

main()