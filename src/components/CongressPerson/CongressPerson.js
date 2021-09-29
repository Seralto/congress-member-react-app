import React from "react";

import {ReactComponent as FacebookLogo} from "../../assets/social/Facebook.svg";
import {ReactComponent as TwitterLogo} from "../../assets/social/Twitter.svg";
import {ReactComponent as YouTubeLogo} from "../../assets/social/YouTube.svg";
import {ReactComponent as Calendar} from "../../assets/Calendar.svg";

import "./CongressPerson.scss"

import AmericanStates from "./AmericanStates.js"

function CongressPerson(props){
  let member = props.member;

  return (
    <div className="Member-card">
      <img
        src={getAvatarSrc(member)}
        onError={addDefaultAvatarSrc}
        className="Avatar"
      />

      <h1>{ member.full_name }</h1>
      <p>{getParty(member)}</p>
      <p>{AmericanStates[member.state]}</p>
      <p className="Next-election">
        <Calendar with="20" />
        <span>{member.next_election}</span>
      </p>

      <div className="Social-box">
        {member.facebook_account &&
          <a href={"https://web.facebook.com/" + member.facebook_account} target="_blank">
            <FacebookLogo />
          </a>
        }

        {member.twitter_account &&
          <a href={"https://twitter.com/" + member.twitter_account} target="_blank">
            <TwitterLogo />
          </a>
        }

        {member.youtube_account &&
          <a href={"https://youtube.com/" + member.youtube_account} target="_blank">
            <YouTubeLogo />
          </a>
        }
      </div>
    </div>
  );
}

function getParty(member) {
  return member.party == "R" ? "Republican" : "Democrat"
}

function getAvatarSrc(member) {
  return member.facebook_account
    ? "https://graph.facebook.com/" + member.facebook_account + "/picture"
    : "./Avatar.png"
}

function addDefaultAvatarSrc(e) {
  e.target.src = "./Avatar.png"
}

export default CongressPerson;
