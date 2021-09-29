import React, { useEffect, useState } from 'react';
import './App.scss';

import Spinner from 'react-bootstrap/Spinner'

import api from './services/api';
import Header from './components/Header/Header';
import CongressPerson from './components/CongressPerson/CongressPerson'

function App(){
  const SENATE_CHAMBER = 'senate'
  const DEFAULT_SESSION = 115;

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [nextElectionYears, setNextElectionYears] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [search, setSeach] = useState('');
  const [gender, setGender] = useState('');
  const [party, setParty] = useState('');
  const [nextElection, setNextEleciton] = useState(0);
  const [chamber, setChamber] = useState(SENATE_CHAMBER);
  const [session, setSession] = useState(DEFAULT_SESSION);

  const filter = () => {
    return members
      .filter(member => member.full_name.toLowerCase().includes(search.toLowerCase()))
      .filter(member => member.gender?.includes(gender))
      .filter(member => member.party?.includes(party))
      .filter(member => member.next_election?.includes(nextElection))
  };

  const setMembersFullName = (members) => {
    members.forEach(member => {
      member.full_name = [member.first_name, member.middle_name, member.last_name]
        .join(' ').replace(/\s\s+/g, ' ');
    })
    return members
  };

  const setElectionYears = (members) => {
    let years = members.map(member => member.next_election);
    years = [...new Set(years)].filter(Number).sort();
    setNextElectionYears(years);
  };

  const setSessions = () => {
    // 80-117 for Senate, 102-117 for House
    const start = chamber === SENATE_CHAMBER ? 80 : 102
    const end = 117
    const sessions = Array(end - start + 1).fill().map((_, id) => start + id)
    setSessionList(sessions)
  };

  useEffect(() => {
    setLoading(true);

    api.get(`${session}/${chamber}/members.json`)
      .then(({ data }) => {
        const members = setMembersFullName(data.results[0].members);
        setMembers(members);
        setElectionYears(members);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
        setSessions();
      });
  }, [chamber, session])

  return (
    <div className="App">
      <Header
        nextElectionYears={nextElectionYears}
        sessions={sessionList}
        session={session || DEFAULT_SESSION}
        sendSearchWord={setSeach}
        sendSelectGender={setGender}
        sendSelectParty={setParty}
        sendSelectNextElection={setNextEleciton}
        sendSelectChamber={setChamber}
        sendSelectSession={setSession}
      />

      <section className="container">
        {loading ?
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :
          <div className="Members-list">
            {filter().length === 0 ? <h3>No results found</h3> :
              filter()?.map(member => (
                <CongressPerson
                  key={member.id}
                  member={member}
                />
              ))
            }
          </div>
        }
      </section>
    </div>
  );
}

export default App;
