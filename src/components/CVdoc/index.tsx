/*
MyJob Recruitment System - Part of MyJob Platform

Author: Pham Le Quan (updated)
Email: phamlequan118@gmail.com
Copyright (c) 2025 Pham Le Quan

License: MIT License
*/

import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
import env from '../../constant/env';
import type { IOnlineResume } from '../../types/resume/ResumeType';
import { getLabelFromValue } from '../../ultils/functions/getLabelFromValue';
import {
  POSITION_OPTIONS,
  ACADEMICLEVEL_OPTIONS,
  EXPERIENCE_OPTIONS,
  WORKPLACE_OPTIONS,
  JOBTYPE_OPTIONS,
  MARTIALSTATUS_OPTIONS,
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS
} from '../../constant/selectOptions';

const DEFAULT_AVATAR = env.DEFAULT_AVATAR;

Font.register({
  family: 'FZ Poppins',
  fonts: [
    { src: '/fonts/FZ Poppins-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/FZ Poppins-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/FZ Poppins-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
    { src: '/fonts/FZ Poppins-Black.ttf', fontWeight: 900 },
    { src: '/fonts/FZ Poppins-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/FZ Poppins-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/FZ Poppins-Light.ttf', fontWeight: 300 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#f5f5f5',
    fontFamily: 'FZ Poppins',
    fontSize: 10,
    color: '#333',
    paddingTop: 30,
    paddingBottom:30
  },
  
  // Header với avatar và thông tin cơ bản
  header: {
    backgroundColor: '#4a5568',
    padding: '20 30',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    margin: '0 20 0 20',
  },
  avatar: {
    width: 70,
    height: 70,
    objectFit: 'cover',
  },
  headerInfo: {
    flex: 1,
  },
  name: { 
    fontSize: 16, 
    fontWeight: 600, 
    color: '#fff',
    marginBottom: 3,
  },
  emailHeader: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#cbd5e0',
    marginLeft: 8,
  },
  position: { 
    fontSize: 12, 
    fontWeight: 400, 
    color: '#e2e8f0',
    marginBottom: 2,
  },
  updated: { 
    fontSize: 10, 
    color: '#cbd5e0',
  },

  // Section container
  section: {
    backgroundColor: '#fff',
    margin: '0 20 10 20',
  },

  // Section header
  sectionHeader: {
    backgroundColor: '#4a5568',
    padding: '12 20',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#fff',
  },

  // Section content
  sectionContent: {
    padding: '15 20',
  },

  // Grid layout for info (3 columns)
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCol: {
    width: '33.33%',
    marginBottom: 12,
    paddingRight: 10,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 500,
    color: '#2d3748',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.3,
  },

  // Goal text
  goalText: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.5,
    textAlign: 'justify',
  },

  // Experience item
  experienceItem: {
    marginBottom: 15,
    paddingBottom: 12,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 400,
    color: '#4a5568',
    marginBottom: 3,
  },
  experienceDate: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 6,
  },
  experienceDesc: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // Education item
  educationItem: {
    marginBottom: 10,
  },
  educationText: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.4,
  },

  // Last item (no margin bottom)
  lastItem: {
    marginBottom: 0,
    paddingBottom: 0,
  },

  // Experience/Education Block (individual item container)
  itemBlock: {
    backgroundColor: '#fff',
    margin: '0 20 5 20',
  },

  // Item content (for individual blocks)
  itemContent: {
    padding: '8 12',
  },

  // Footer text at bottom right of each page
  pageFooter: {
    position: 'absolute',
    bottom: 10,
    right: 40,
    fontSize: 10,
    color: '#bbb',
  },
  dotFilled: {
    color: '#222',
    fontSize: 30,
    marginBottom:4,
    marginRight: 1,
    fontFamily: 'Times-Roman',
  },
  dotEmpty: {
    color: '#bbb',
    fontSize: 30,
    marginBottom:4,
    marginRight: 1,
    fontFamily: 'Times-Roman',
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 2,
  },
});

const formatDate = (dateInput: string | Date) => {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`;
}

const renderDot = (level: number) => {
  const max = 5;
  const dots = [];
  for (let i = 0; i < max; i++) {
    dots.push(
      <Text key={i} style={i < level ? styles.dotFilled : styles.dotEmpty}>
        •
      </Text>
    );
  }
  return <View style={styles.dotRow}>{dots}</View>;
};


const CVPdfDocument: React.FC<{ resume: IOnlineResume }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src={resume.userInfo?.avatar?.url || DEFAULT_AVATAR} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.name}>{resume.userInfo?.fullName}</Text>
            <Text style={styles.emailHeader}>{resume.userInfo?.email}</Text>
          </View>
          <Text style={styles.position}>{resume.resume?.title}</Text>
          <Text style={styles.updated}>Thời gian cập nhật: {formatDate(String(resume.resume?.updatedAt))}</Text>
        </View>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.infoGrid}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{resume.candidate?.phone}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Giới tính</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(GENDER_OPTIONS, resume.candidate?.gender)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Ngày sinh</Text>
              <Text style={styles.infoValue}>{formatDate(String(resume.candidate?.birthday)) }</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Tình trạng hôn nhân</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(MARTIALSTATUS_OPTIONS, resume.candidate?.maritalStatus)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Tỉnh/Thành phố</Text>
              <Text style={styles.infoValue}>{resume.candidate?.province?.name}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Quận/Huyện</Text>
              <Text style={styles.infoValue}>{resume.candidate?.district?.name }</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Địa chỉ</Text>
              <Text style={styles.infoValue}>{resume.candidate?.address}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Thông tin chung */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thông tin chung</Text>
        </View>
        <View style={styles.sectionContent}>
          <View style={styles.infoGrid}>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Vị trí mong muốn</Text>
              <Text style={styles.infoValue}>{resume.resume?.title}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Cấp bậc mong muốn</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(POSITION_OPTIONS, resume.resume?.position)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Trình độ học vấn</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(ACADEMICLEVEL_OPTIONS, resume.resume?.academicLevel)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Kinh nghiệm</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(EXPERIENCE_OPTIONS, resume.resume?.experience)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Nghề nghiệp</Text>
              <Text style={styles.infoValue}>{resume.resume?.careerId}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Địa điểm làm việc</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(WORKPLACE_OPTIONS, resume.resume?.typeOfWorkPlace)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Nơi làm việc</Text>
              <Text style={styles.infoValue}>Làm việc tại văn phòng</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Hình thức làm việc</Text>
              <Text style={styles.infoValue}>{getLabelFromValue(JOBTYPE_OPTIONS, resume.resume?.jobType)}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Mức lương mong muốn</Text>
              <Text style={styles.infoValue}>
                {resume.resume?.salaryMin && resume.resume?.salaryMax 
                  ? `${resume.resume.salaryMin} - ${resume.resume.salaryMax}` 
                  : ''
                }
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Mục tiêu nghề nghiệp */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mục tiêu nghề nghiệp</Text>
        </View>
        <View style={styles.sectionContent}>
          <Text style={styles.goalText}>
            {resume.resume?.description || 'Đây là mục tiêu nghề nghiệp của tôi. Mục tiêu nghề nghiệp rõ ràng!'}
          </Text>
        </View>
      </View>

      {/* Section header cho Kinh nghiệm làm việc */}
      {resume.experiences.length > 0 && (
        <>
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Kinh nghiệm làm việc</Text>
            </View>
          </View>
          {resume.experiences.map((exp, i) => (
            <View key={i} style={styles.itemBlock}>
              <View style={styles.itemContent}>
                <Text><Text style={styles.infoLabel}>Vị trí: </Text><Text style={styles.experienceTitle}>{exp.jobName}</Text></Text>
                <Text><Text style={styles.infoLabel}>Công ty: </Text><Text style={styles.experienceCompany}>{exp.companyName}</Text></Text>
                <Text><Text style={styles.infoLabel}>Thời gian: </Text><Text style={styles.experienceDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</Text></Text>
                <Text><Text style={styles.infoLabel}>Mô tả: </Text><Text style={styles.experienceDesc}>{exp.description}</Text></Text>
              </View>
            </View>
          ))}
        </>
      )}

      {/* Section header cho Học vấn */}
      {resume.educations.length > 0 && (
        <>
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Học vấn</Text>
            </View>
          </View>
          {resume.educations.map((edu, i) => (
            <View key={i} style={styles.itemBlock}>
              <View style={styles.itemContent}>
                <Text><Text style={styles.infoLabel}>Bằng cấp: </Text><Text style={styles.experienceTitle}>{edu.degreeName}</Text></Text>
                <Text><Text style={styles.infoLabel}>Nơi đào tạo: </Text><Text style={styles.experienceCompany}>{edu.trainingPlace}</Text></Text>
                <Text><Text style={styles.infoLabel}>Thời gian: </Text><Text style={styles.experienceDate}>{formatDate(edu.startDate)} - {formatDate(edu?.completedDate)}</Text></Text>
                <Text><Text style={styles.infoLabel}>Mô tả: </Text><Text style={styles.experienceDesc}>{edu.description}</Text></Text>
              </View>
            </View>
          ))}
        </>
      )}

      {/* Section header cho Chứng chỉ */}
      {resume.certificates.length > 0 && (
        <>
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Chứng chỉ</Text>
            </View>
          </View>
          {resume.certificates.map((cert, i) => (
            <View key={i} style={styles.itemBlock}>
              <View style={styles.itemContent}>
                <Text><Text style={styles.infoLabel}>Tên chứng chỉ: </Text><Text style={styles.experienceTitle}>{cert.name}</Text></Text>
                <Text><Text style={styles.infoLabel}>Nơi cấp: </Text><Text style={styles.experienceCompany}>{cert.trainingPlace}</Text></Text>
                <Text><Text style={styles.infoLabel}>Thời gian: </Text><Text style={styles.experienceDate}>{formatDate(cert.startDate)} - {formatDate(cert.expirationDate)}</Text></Text>
              </View>
            </View>
          ))}
        </>
      )}

      {/* Section header cho Ngoại ngữ */}
      {resume.languages.length > 0 && (
        <>
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ngoại ngữ</Text>
            </View>
          </View>
          {resume.languages.map((lang, i) => (
            <View key={i} style={styles.itemBlock}>
              <View style={styles.itemContent}>
                <Text><Text style={styles.infoLabel}>Ngôn ngữ: </Text><Text style={styles.experienceTitle}>{getLabelFromValue(LANGUAGE_OPTIONS, lang.language)}</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.infoLabel}>Trình độ: </Text>
                  {renderDot(lang.level)}
                </View>
              </View>
            </View>
          ))}
        </>
      )}

      {/* Section header cho Kỹ năng */}
      {resume.skills.length > 0 && (
        <>
          <View style={styles.section} wrap={false}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Kỹ năng</Text>
            </View>
          </View>
          {resume.skills.map((skill, i) => (
            <View key={i} style={styles.itemBlock}>
              <View style={styles.itemContent}>
                <Text><Text style={styles.infoLabel}>Kỹ năng: </Text><Text style={styles.experienceTitle}>{skill.name}</Text></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.infoLabel}>Trình độ: </Text>
                  {renderDot(skill.level)}
                </View>
              </View>
            </View>
          ))}
        </>
      )}
      <Text style={styles.pageFooter} fixed>
        MyJob.Cv
      </Text>
    </Page>
  </Document>
);

export default CVPdfDocument;