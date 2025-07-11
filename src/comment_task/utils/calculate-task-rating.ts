import { CommentTask } from '../entities/comment_task.entity';

export function calculateTaskRating(task: CommentTask): number {
  const fields = [
    task.requirementsForTask,
    task.taskLevel,
    task.fairAssessment,
    task.taskSize,
    task.realWork,
    task.feedback,
  ];

  const filled = fields.filter(n => typeof n === 'number');
  if (!filled.length) return 0;

  const avg = filled.reduce((a, b) => a + b, 0) / filled.length;
  return Math.round(avg * 100) / 100; // округлим до сотых
}
