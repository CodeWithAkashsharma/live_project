// src/data/complaintsData.js
import { FileText, Clock, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export const complaintStats = [
  {
    id: 'total',
    label: 'Total',
    count: 7,
    icon: FileText,
    bgColor: 'bg-blue-600',
    iconBgColor: 'bg-blue-700',
  },
  {
    id: 'open',
    label: 'Open',
    count: 3,
    icon: Clock,
    bgColor: 'bg-blue-500',
    iconBgColor: 'bg-blue-600',
  },
  {
    id: 'in_progress',
    label: 'In Progress',
    count: 0,
    icon: ArrowRight,
    bgColor: 'bg-orange-500',
    iconBgColor: 'bg-orange-600',
  },
  {
    id: 'resolved',
    label: 'Resolved',
    count: 3,
    icon: CheckCircle,
    bgColor: 'bg-green-600',
    iconBgColor: 'bg-green-700',
  },
  {
    id: 'closed',
    label: 'Closed',
    count: 1,
    icon: XCircle,
    bgColor: 'bg-gray-600',
    iconBgColor: 'bg-gray-700',
  },
];

export const complaints = [
  {
    id: 1,
    title: 'No',
    status: 'open',
    statusLabel: 'OPEN',
    category: 'Harassment',
    employee: 'Mohit kumar',
    description: 'being a black guy felt leftout and people push me down',
    date: '11/20/2025',
  },
  {
    id: 2,
    title: 'Test Safety Violation with Evidence',
    status: 'open',
    statusLabel: 'OPEN',
    category: 'Safety Violation',
    employee: 'Yash vardhan',
    description: 'Safety violation with photographic evidence attached.',
    date: '11/20/2025',
  },
  {
    id: 3,
    title: 'Test Safety Violation with Evidence',
    status: 'open',
    statusLabel: 'OPEN',
    category: 'Safety Violation',
    employee: 'Hemant singh kanwal',
    description: 'Safety violation with photographic evidence attached.',
    date: '11/20/2025',
  },

  {
    id: 4,
    title: 'Resolved Complaint Example',
    status: 'resolved',
    statusLabel: 'RESOLVED',
    category: 'Misconduct',
    employee:'Akash sharma',
    description: 'Issue has been resolved successfully.',
    date: '11/18/2025',
  },
  {
    id: 5,
    title: 'Closed Complaint Example',
    status: 'closed',
    statusLabel: 'CLOSED',
    category: 'Policy Violation',
    employee: 'Nandini sharma',
    description: 'Complaint was closed after review.',
    date: '11/15/2025',
  },
];
