import { FC, useState, useEffect } from 'react';
import {
  Panel, PanelHeader, Group, Header, FormItem, Input, Textarea,
  Button, Div, Select
} from '@vkontakte/vkui';
import { NavIdProps } from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { generateDocument } from '../utils/documentExporter.ts';

interface ResumeBuilderProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const ResumeBuilder: FC<ResumeBuilderProps> = ({ id, fetchedUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [city, setCity] = useState('');
  const [contacts, setContacts] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [template, setTemplate] = useState('template1');
  const [format, setFormat] = useState('pdf');

  useEffect(() => {
    if (fetchedUser) {
      setFirstName(fetchedUser.first_name || '');
      setLastName(fetchedUser.last_name || '');
      setCity(fetchedUser.city?.title || '');
    }
  }, [fetchedUser]);

  const handleExport = () => {
    generateDocument({
      firstName,
      lastName,
      middleName,
      city,
      photo: fetchedUser?.photo_200 || '',
      contacts,
      education,
      experience,
      template,
      format,
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Конструктор резюме</PanelHeader>
      <Group header={<Header>Основная информация</Header>}>
        <FormItem top="Имя">
          <Input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </FormItem>
        <FormItem top="Фамилия">
          <Input value={lastName} onChange={e => setLastName(e.target.value)} />
        </FormItem>
        <FormItem top="Отчество">
          <Input value={middleName} onChange={e => setMiddleName(e.target.value)} />
        </FormItem>
        <FormItem top="Город">
          <Input value={city} onChange={e => setCity(e.target.value)} />
        </FormItem>
        <FormItem top="Контактные данные">
          <Textarea value={contacts} onChange={e => setContacts(e.target.value)} />
        </FormItem>
        <FormItem top="Образование">
          <Textarea value={education} onChange={e => setEducation(e.target.value)} />
        </FormItem>
        <FormItem top="Опыт работы">
          <Textarea value={experience} onChange={e => setExperience(e.target.value)} />
        </FormItem>
      </Group>

      <Group header={<Header>Настройки</Header>}>
        <FormItem top="Шаблон">
          <Select
            value={template}
            onChange={e => setTemplate(e.target.value)}
            options={[
              { value: 'templateOne', label: 'Классический' },
              { value: 'templateTwo', label: 'Современный' },
            ]}
          />
        </FormItem>
        <FormItem top="Формат экспорта">
          <Select
            value={format}
            onChange={e => setFormat(e.target.value)}
            options={[
              { value: 'pdf', label: 'PDF' },
              { value: 'docx', label: 'DOCX' },
            ]}
          />
        </FormItem>
      </Group>

      <Div>
        <Button size="l" stretched onClick={handleExport}>Скачать резюме</Button>
      </Div>
    </Panel>
  );
};