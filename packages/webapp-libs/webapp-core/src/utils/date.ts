import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Initialize dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Format a date in relative time (e.g. "3 days ago")
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Format a date with a specific format
 * @param date Date to format
 * @param format Format string (dayjs format)
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date, format = 'MMMM D, YYYY'): string => {
  return dayjs(date).format(format);
};

/**
 * Format a datetime with a specific format
 * @param date Date to format
 * @param format Format string (dayjs format)
 * @returns Formatted datetime string
 */
export const formatDateTime = (date: string | Date, format = 'MMMM D, YYYY h:mm A'): string => {
  return dayjs(date).format(format);
};

/**
 * Convert a UTC date to local timezone
 * @param date UTC date to convert
 * @returns Date in local timezone
 */
export const utcToLocalTime = (date: string | Date): Date => {
  return dayjs.utc(date).local().toDate();
};

/**
 * Check if a date is today
 * @param date Date to check
 * @returns True if date is today
 */
export const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * Check if a date is in the past
 * @param date Date to check
 * @returns True if date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

/**
 * Check if a date is in the future
 * @param date Date to check
 * @returns True if date is in the future
 */
export const isFuture = (date: string | Date): boolean => {
  return dayjs(date).isAfter(dayjs());
};