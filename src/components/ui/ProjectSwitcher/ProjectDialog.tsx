'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import cn from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, Field, Heading, InputField, Label } from '@/components/ui/kit';
import { useTranslations } from '@/i18n';
import type { Project, ProjectInfo } from '@/zustand';

import { PROJECT_EMOJIS, firstGrapheme } from './emojis';

interface Props {
  project: Project | null;
  onClose: () => void;
  onSave: (id: string, info: ProjectInfo) => void;
}

// eslint-disable-next-line jsdoc/require-jsdoc
const ProjectForm: FC<Omit<Props, 'project'> & { project: Project }> = ({
  project,
  onClose,
  onSave,
}) => {
  const { t } = useTranslations();
  const [name, setName] = useState(project.name);
  const [emoji, setEmoji] = useState(project.emoji);
  const [description, setDescription] = useState(project.description);

  return (
    <DialogPanel
      as='form'
      className={cn(
        'flex w-full max-w-[44rem] flex-col gap-[2.0rem]',
        'border-[1px] border-divider bg-primary-bg p-[2.4rem]',
      )}
      onSubmit={e => {
        e.preventDefault();
        onSave(project.id, {
          name: name.trim(),
          emoji: emoji || project.emoji,
          description: description.trim(),
        });
        onClose();
      }}
    >
      <DialogTitle as='div'>
        <Heading level={2}>{t.projects.dialog.title}</Heading>
      </DialogTitle>

      <div className={cn('flex flex-col gap-[0.8rem]')}>
        <Label>{t.projects.dialog.emoji}</Label>
        <div className={cn('flex flex-wrap gap-[0.8rem]')}>
          <InputField
            value={emoji}
            onChange={e => setEmoji(firstGrapheme(e.target.value))}
            aria-label={t.projects.dialog.emoji}
            className={cn('w-[5.6rem] text-center')}
          />

          {PROJECT_EMOJIS.map(item => (
            <Button
              key={item}
              type='button'
              square
              aria-pressed={item === emoji}
              className={cn('text-[1.6rem]', {
                '!border-accent': item === emoji,
              })}
              onClick={() => setEmoji(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className={cn('flex flex-col gap-[0.8rem]')}>
        <Label>{t.projects.dialog.name}</Label>
        <InputField
          autoFocus
          value={name}
          placeholder={t.projects.untitled}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className={cn('flex flex-col gap-[0.8rem]')}>
        <Label>{t.projects.dialog.description}</Label>
        <Field asChild>
          <textarea
            rows={3}
            value={description}
            placeholder={t.projects.dialog.descriptionPlaceholder}
            onChange={e => setDescription(e.target.value)}
            className={cn('resize-none')}
          />
        </Field>
      </div>

      <div className={cn('flex justify-end gap-[0.8rem]')}>
        <Button onClick={onClose}>{t.projects.dialog.cancel}</Button>
        <Button type='submit'>{t.projects.dialog.save}</Button>
      </div>
    </DialogPanel>
  );
};

/**
 * Modal for editing project name, icon and description.
 */
export const ProjectDialog: FC<Props> = ({ project, onClose, onSave }) => (
  <Dialog
    open={project !== null}
    onClose={onClose}
    className={cn('relative z-50')}
  >
    <DialogBackdrop className={cn('fixed inset-0 bg-black/60')} />

    <div className={cn('fixed inset-0 flex items-center justify-center p-4')}>
      {/* Keyed, so form state is reset for every project. */}
      {project && (
        <ProjectForm
          key={project.id}
          project={project}
          onClose={onClose}
          onSave={onSave}
        />
      )}
    </div>
  </Dialog>
);
