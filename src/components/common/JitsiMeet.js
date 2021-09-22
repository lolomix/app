import React, { Component } from "react";

class JitsiMeet extends Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
    this._onIframeLoad = this._onIframeLoad.bind(this);
    this._onVideoConferenceEnded = this._onVideoConferenceEnded.bind(this);
  }

  state = {
    isLoading: true,
  };

  componentDidMount() {
    const parentNode = this._ref.current;
    const room = this.props.room;
    const serverURL = this.props.serverURL;
    this._conference = { room, serverURL };
    const script = document.createElement("script");
    script.async = true;
    script.onload = () => this._onScriptLoad(parentNode);
    script.src = "https://meet.jit.si/external_api.js";
    this._ref.current.appendChild(script);

    // Set a timer for 10s, if we haven't loaded the iframe by then, load alternate
    this._loadTimer = setTimeout(() => {
      this.props.setVideoOn(false);
    }, 10000);
  }

  componentWillUnmount() {
    if (this._loadTimer) {
      clearTimeout(this._loadTimer);
    }
    if (this._api) {
      this._api.dispose();
    }
  }

  _onScriptLoad(parentNode) {
    const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;

    const host = this._conference.serverURL.replace(/https?:\/\//, "");

    const configOverwrite = {
      startWithAudioMuted: this.props.startWithAudioMuted,
      startWithVideoMuted: this.props.startWithVideoMuted,
    };

    this._api = new JitsiMeetExternalAPI(host, {
      configOverwrite,
      onload: this._onIframeLoad,
      parentNode,
      roomName: this._conference.room,
    });

    this._api.on("suspendDetected", this._onVideoConferenceEnded);
    this._api.on("readyToClose", this._onVideoConferenceEnded);
    this._api.on("videoConferenceJoined", (conferenceInfo) => {
      // this.props.dispatch(this.conferenceJoined(this._conference));
      // this._onVideoConferenceJoined(conferenceInfo);
      console.log("joined");
    });
  }

  _onVideoConferenceEnded(event) {
    console.log("videoconf ended");
  }

  _onIframeLoad() {
    if (this._loadTimer) {
      clearTimeout(this._loadTimer);
      this._loadTimer = null;
    }
    this.setState({
      isLoading: false,
    });
  }
  /*
  _onVideoConferenceJoined(conferenceInfo) {
    this._setAvatarURL(this.props.avatarURL);
    this._setEmail(this.props.email);
    this._setName(this.props.name);
  }
  _setAvatarURL(avatarURL) {
      this._api.executeCommand('avatarUrl', avatarURL);
  }
  _setEmail(email) {
      this._api.executeCommand('email', email);
  }
  _setName(name) {
      this._api.executeCommand('displayName', name);
  }
*/
  render() {
    return (
      <div className="jitsi" ref={this._ref}>
        {this.state.isLoading && <p>Loading</p>}
      </div>
    );
  }
}

export default JitsiMeet;
