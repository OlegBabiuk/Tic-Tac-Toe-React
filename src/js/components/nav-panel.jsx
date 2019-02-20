/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';


class NavPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowTypeGame: false,
      isActiveRestart: false,
    };
  }

  onStartBtn() {
    const { isActiveRestart } = this.state;
    const { onClick } = this.props;
    if (isActiveRestart) {
      this.setState(prevState => (
        {
          isShowTypeGame: !prevState.isShowTypeGame,
        }
      ));
      onClick('restart');
    } else {
      this.setState(prevState => (
        {
          isShowTypeGame: !prevState.isShowTypeGame,
          isActiveRestart: !prevState.isActiveRestart,
        }
      ));
    }
  }

  onTypeGameBtn(type) {
    const { onClick } = this.props;
    this.setState(prevState => (
      {
        isShowTypeGame: !prevState.isShowTypeGame,
      }
    ));
    onClick(type);
  }

  render() {
    const { isShowTypeGame, isActiveRestart } = this.state;
    return (
      <div className="navPanel">
        {isShowTypeGame
          ? (
            <div className="choiceBtn">
              <span
                className="choiceBtn__pc"
                onClick={() => this.onTypeGameBtn('pc')}
              >
                ONE PLAYER
              </span>
              <span
                className="choiceBtn__pc"
                onClick={() => this.onTypeGameBtn('human')}
              >
                TWO PLAERS
              </span>
            </div>
          )
          : (
            <span
              className="mainBtn"
              onClick={() => this.onStartBtn()}
            >
              {isActiveRestart ? 'RESTART GAME' : 'START GAMEa'}
            </span>
          )
        }
      </div>
    );
  }
}

NavPanel.propTypes = {
  onClick: PropTypes.func,
};

NavPanel.defaultProps = {
  onClick: () => console.log("onClick didn't pass"),
};

export default NavPanel;
