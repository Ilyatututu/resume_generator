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

export const TemplateOne: FC<TemplateProps> = ({
  firstName,
  lastName,
  middleName,
  city,
  contacts,
  education,
  experience,
  photo,
}) => (
  <div style={{ fontFamily: 'Arial', padding: 20, width: 595 }}>
    <h1>{`${lastName} ${firstName} ${middleName || ''}`}</h1>
    {photo && <img src={photo} alt="Фото" width={100} />}
    <p><strong>Город:</strong> {city}</p>
    <p><strong>Контакты:</strong><br />{contacts}</p>
    <p><strong>Образование:</strong><br />{education}</p>
    <p><strong>Опыт:</strong><br />{experience}</p>
  </div>
);