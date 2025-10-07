// src/lib/getResume.ts
import {getMessages, getLocale} from 'next-intl/server';
import type {ResumeMessages} from './types';

export async function getResume() {
  const locale = (await getLocale()) as 'es' | 'en';
  const messages = await getMessages();
  const resume = (messages as any).resume as ResumeMessages;
  return {locale, resume};
}