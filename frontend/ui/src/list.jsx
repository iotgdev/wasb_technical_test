import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TeamMemberListCard = ({ member }) => {
  console.log(member)
  return (
    <div style={{padding: "20px"}}>
      <p>
        <span>Name: <b>{member.name}</b></span>
      </p>
      <p>
        <small>
          <span>Job Title: <b>{member.job_title}</b></span>
        </small>
      </p>
      <p>
        <small>
          <span>Info: <b>{member.introduction}</b></span>
        </small>
      </p>
      <small>
        <Link to={`/team/${member.id}/`}>More Info...</Link>
      </small>
      <br/>
    </div>
  )
}


export default function TeamListPage () {

  const [team, setTeam] = useState([]);

  useEffect(async () => {
    const response = await fetch('http://localhost:8000/team/profile/')
    const team = await response.json();
    console.log(team);
    setTeam(team)
  }, [setTeam])

  return (
    <div>
      {
        team.map(
          (member) => (
            <TeamMemberListCard member={member} />
          )
        )
      }
    </div>
  )
}