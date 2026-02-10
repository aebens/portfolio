export type TopicFilter = 'all' | 'genealogy' | 'ra' | 'visual' | 'tools';
export type MediumFilter = 'all' | 'webapp' | 'photo' | 'video' | 'design' | 'training';

export interface Project {
  id: number;
  title: string;
  desc: string;
  topic: Exclude<TopicFilter, 'all'>;
  topicLabel: string;
  medium: Exclude<MediumFilter, 'all'>;
  mediumLabel: string;
  date: string;
  body: string; // HTML string
  tech: string[];
  image?: string; // Optional project screenshot
}
