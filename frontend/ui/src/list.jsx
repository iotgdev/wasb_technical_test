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


export default function TeamListPage ({match, location}) {
  let frontUrl = 'http://localhost:3000/team'

  const [team, setTeam] = useState([]);

  const [orderParam, value] = (location.search.length) ? location.search.slice(1).split('=') : [null, null]

  useEffect(async () => {
    const response = await fetch('http://localhost:8000/team/profile/')
    const team = await response.json();
    if (!value || value === 'name') {
       team.sort((a, b) => a.name.localeCompare(b.name))
    } else if (value === 'job_title'){
       team.sort((a, b) => a.job_title.localeCompare(b.job_title))
    }

    console.log(team);
    setTeam(team)
  }, [setTeam])

  return (
    <div>
        <div className={'ordering'}>
            <p>Order by:</p>
            <a href={frontUrl + '?order-by=name'}>Name</a>
            <a href={frontUrl + '?order-by=job_title'}>Job Title</a>
        </div>
      {
        team.map(
          (member, index) => (
            <span key={index}>{(index ? <hr/> : '')} <TeamMemberListCard member={member}/></span>
          )
        )
      }
    </div>
  )
}