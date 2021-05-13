import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TeamMemberSummary = ({ member }) => {
  return (
    <div style={{padding: "20px"}}>
      <h1>{member.name}</h1>
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
      <br/>
      <h3>Hobbies</h3>
      <TeamMemberHobbies hobbies={member.hobbies} />
      <br />
      <h3>Skills</h3>
      <TeamMemberSkills skills={member.skills} />
      <br />
    </div>
  )
}


const TeamMemberHobbies = ({ hobbies }) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Proficiency</th>
      </tr>
      {
        hobbies.map(
          (hobby) => (
            <tr>
              <td>{hobby.name}</td>
              <td>{hobby.strength}</td>
            </tr>
          )
        )
      }
    </table>
  );
}

const TeamMemberSkills = ({ skills }) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Proficiency</th>
      </tr>
      {
        skills.map(
          (skill) => (
            <tr>
              <td>{skill.name}</td>
              <td>{skill.strength}</td>
            </tr>
          )
        )
      }
    </table>
  );
}


export default function TeamDetailPage (props) {

  const { match: { params: { teamMemberId }}} = props;

  const [member, setMember] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {

    setError(false);
    const response = await fetch(`http://localhost:8000/team/profile/${teamMemberId}/`);
    if (response.status !== 200) {
        setError(true);
        return;
    }
    const member = await response.json();
    setMember(member)
  }, [setMember])

  if (!error && member.id) {
    return (
      <div>
        {/* TODO: add a "back" button */}
        <TeamMemberSummary member={member}/>
      </div>
    )
  }
  return null;
}