import { FC } from 'react';

interface TemplateProps {
  firstName: string;
  lastName: string;
  middleName?: string;
  city: string;
  contacts: string;
  education: string;
  experience: string;
  photo: string;
}

export const TemplateTwo: FC<TemplateProps> = ({
  firstName,
  lastName,
  middleName,
  city,
  contacts,
  education,
  experience,
  photo,
}) => (
  <div style={{ fontFamily: 'Georgia', backgroundColor: '#f0f0f0', padding: 30, width: 595 }}>
    <h2 style={{ color: 'navy' }}>{`${lastName} ${firstName} ${middleName || ''}`}</h2>
    {photo && <img src={photo} alt="Фото" width={100} />}
    <p><em>{city}</em></p>
    <hr />
    <p><strong>Контакты:</strong><br />{contacts}</p>
    <p><strong>Образование:</strong><br />{education}</p>
    <p><strong>Опыт:</strong><br />{experience}</p>
  </div>
);