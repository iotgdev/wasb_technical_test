import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TeamMemberSummary = ({ member }) => {
    const renderAge = (yearsOfExperience) => {
        switch (true) {
            case yearsOfExperience > 60:
                return 'ancient'

            case yearsOfExperience > 40:
                return 'old'

            case yearsOfExperience < 30:
                return 'barely out of diapers'

            default:
                return 'probably a responsible adult'

        }
    }

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
      <p>
        <small>
          <span>Approximate age: <b>{renderAge(member.years_of_experience)}</b></span>
        </small>
      </p>
      <br/>
      <h3>Hobbies</h3>
      <TeamMemberHobbies hobbies={member.hobbies} />
      <br />
      <h3>Passionate</h3>
      <p>Passion Score: {member.average_hobby_strength}</p>
      <br />
      <h3>Skills</h3>
      <TeamMemberSkills skills={member.skills} />
      <br />
      <h3>About</h3>
      <p>ID: {member.id}</p>
      <p>Average Skill Proficiency: {member.average_skill_proficiency}</p>
      <p>Years Of Experience: {member.years_of_experience}</p>
      <p>Maximum Passion: {member.maximum_passion}</p>
      <br />
    </div>
  )
}


const TeamMemberHobbies = ({ hobbies }) => {
  return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Proficiency</th>
            </tr>
        </thead>
        <tbody>
            {
                hobbies.map(
                  (hobby, index) => (
                    <tr key={index}>
                      <td>{hobby.name}</td>
                      <td>{hobby.strength}</td>
                    </tr>
                  )
                )
            }
        </tbody>
    </table>
  );
}

const TeamMemberSkills = ({ skills }) => {
  return (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Proficiency</th>
            </tr>
        </thead>
        <tbody>
            {
                skills.map(
                  (skill, index) => (
                    <tr key={index}>
                      <td>{skill.name}</td>
                      <td>{skill.strength}</td>
                    </tr>
                  )
                )
            }
        </tbody>
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
    console.log(member)
    setMember(member)
  }, [setMember])

  if (!error && member.id) {
    return (
      <div>
        {/* TODO: add a "back" button */}
        <TeamMemberSummary member={member}/>
      </div>
    )
  } else if (error) {
      return (
          <div>
              <h1>Opps, something went wrong :(</h1>
              <h2>We apologise and are working hard to solve the problem.</h2>
          </div>
      )
  }
  return null;
}