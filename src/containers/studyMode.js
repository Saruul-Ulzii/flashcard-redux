import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { setScore, shuffleDeck } from '../actions/index';
import Flashcard from '../components/flashcard';

class StudyMode extends Component {

	constructor(props) {

		super(props);

		// shuffle current deck's cards
		this.props.shuffleDeck( this.props.deck );
		this.state = { cardIndex: 0, currentDeck: this.props.deck, showAnswer: false };
	}

	getNextCard() {

		if ( this.state.cardIndex === this.state.currentDeck['cards'].length - 1 ) {

			// after all cards are shown, navigate to final score page
			browserHistory.push('/decks/quiz/finalScore');
		}
		else {

			// increment card index, show next card
			let temp = this.state.cardIndex + 1;
			this.setState({ cardIndex: temp });
		}

		this.hideAnswer();
	}

	showAnswer() {

		this.setState({ showAnswer: true });
	}

	hideAnswer() {

		this.setState({ showAnswer: false });
	}

	addScore() {

		var newScore = this.props.currentScore + 1;

		this.props.setScore( newScore );
		this.getNextCard();
	}

	render() {
		return (
			<div>
				<Flashcard />

			
				<div className='row studyModeScore'>
					<div className='col-md-6 col-md-offset-3 text-center'>
						<h4>Score: </h4>{ this.props.currentScore }
					</div>
				</div>
				{ 
					this.state.showAnswer 

					? 

					<div className='row'>
						<div className='col-md-6 col-md-offset-3 text-center'>
							<h3 className='QApadding'>
								{ this.state.currentDeck.cards[ this.state.cardIndex ]['answer'] }
							</h3><br />
							<button type='submit' className='btn btn-primary incorrectBtn' onClick={ event => this.getNextCard() }>
								I Was Wrong!
							</button>
							<button type='submit' className='btn btn-primary correctBtn' onClick={ event => this.addScore() }>
								Correct!
							</button>
						</div>
					</div> 

					:

					<div className='row'>
						<div className='col-md-6 col-md-offset-3 text-center'>
							<h3 className='QApadding'>
								{ this.state.currentDeck.cards[ this.state.cardIndex ]['question'] }
							</h3><br />
							<button type='submit' className='btn btn-primary' onClick={ event => this.showAnswer() }>
								Show Answer
							</button>
						</div>
					</div> 
				}
			

			</div>
		);
	}	
}

function mapStateToProps(state) {
 	return {
 		deck: state.activeDeck,
 		currentScore: state.currentScore
 	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setScore: setScore, shuffleDeck: shuffleDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyMode);



