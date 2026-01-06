/*
MyJob Recruitment System - Part of MyJob Platform
Updated Design: Modern Minimalist Two-Column
*/

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
  Svg,
  Path,
} from '@react-pdf/renderer';
import env from '../../constant/env';
import type { IOnlineResume } from '../../types/resume/ResumeType';
import { getLabelFromValue } from '../../ultils/functions/getLabelFromValue';
import {
  POSITION_OPTIONS,
  ACADEMICLEVEL_OPTIONS,
  EXPERIENCE_OPTIONS,
  WORKPLACE_OPTIONS,
  JOBTYPE_OPTIONS,
  LANGUAGE_OPTIONS
} from '../../constant/selectOptions';

const DEFAULT_AVATAR = env.DEFAULT_AVATAR;
const DEFAULT_THEME_COLOR = '#2B3A55'; // Màu mặc định sang trọng hơn (Deep Navy)
const LOGO_IMAGE = '/assets/vinhuni.png';

// Font registration giữ nguyên
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/FZ Poppins-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/FZ Poppins-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/FZ Poppins-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/FZ Poppins-Black.ttf', fontWeight: 900 },
    { src: '/fonts/FZ Poppins-Italic.ttf', fontWeight: 400, fontStyle: 'italic' },
  ],
});

interface CVPdfDocumentProps {
  resume: IOnlineResume;
  themeColor?: string;
  avatarUrl?: string;
  email?: string;
}

const CVPdfDocument: React.FC<CVPdfDocumentProps> = ({ resume, themeColor, avatarUrl, email }) => {
  const primaryColor = themeColor || DEFAULT_THEME_COLOR;
  const secondaryColor = '#555555';
  const lightBg = '#F4F6F8'; // Màu nền nhẹ cho cột trái

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      fontFamily: 'Roboto',
    },
    // --- Left Column (Sidebar) ---
    leftColumn: {
      width: '32%',
      backgroundColor: lightBg,
      padding: '30 20',
      minHeight: '100%',
      color: '#333',
    },
    avatarContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      objectFit: 'cover',
      border: `3px solid ${primaryColor}`,
    },
    contactSection: {
      marginBottom: 25,
      paddingBottom: 20,
      borderBottom: `1px solid #E0E0E0`,
    },
    sectionTitleSmall: {
      fontSize: 12,
      fontWeight: 700,
      color: primaryColor,
      textTransform: 'uppercase',
      marginBottom: 10,
      letterSpacing: 1,
    },
    contactRow: {
      marginBottom: 8,
    },
    contactLabel: {
      fontSize: 9,
      color: '#777',
      marginBottom: 2,
    },
    contactValue: {
      fontSize: 10,
      fontWeight: 500,
      color: '#333',
      wordBreak: 'break-all',
    },
    // Skills in Sidebar
    skillItem: {
      marginBottom: 8,
    },
    skillName: {
      fontSize: 10,
      fontWeight: 500,
      marginBottom: 3,
    },
    progressBarBg: {
      height: 4,
      backgroundColor: '#D1D5DB',
      borderRadius: 2,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: primaryColor,
      borderRadius: 2,
    },
    // Languages in Sidebar
    langItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
      alignItems: 'center',
    },
    langName: {
      fontSize: 10,
      fontWeight: 500,
    },
    langLevel: {
      fontSize: 9,
      color: '#666',
      fontStyle: 'italic',
    },

    // --- Right Column (Main Content) ---
    rightColumn: {
      width: '68%',
      padding: '30 30',
    },
    headerWrapper: {
      marginBottom: 25,
      borderBottom: `2px solid ${primaryColor}`,
      paddingBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    headerText: {
      flex: 1,
    },
    fullName: {
      fontSize: 24,
      fontWeight: 900,
      color: primaryColor,
      textTransform: 'uppercase',
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    positionTitle: {
      fontSize: 14,
      fontWeight: 500,
      color: secondaryColor,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    logo: {
      width: 40,
      height: 40,
      marginLeft: 15,
      objectFit: 'contain'
    },
    mainSection: {
      marginBottom: 20,
    },
    mainSectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: primaryColor,
      textTransform: 'uppercase',
      marginBottom: 12,
      borderBottom: `1px solid #E0E0E0`,
      paddingBottom: 4,
      letterSpacing: 1,
    },
    // Grid for General Info
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    gridItem: {
      width: '48%',
      flexDirection: 'row',
      marginBottom: 4,
    },
    gridLabel: {
      fontSize: 10,
      color: '#666',
      width: 70,
    },
    gridValue: {
      fontSize: 10,
      fontWeight: 500,
      color: '#333',
      flex: 1,
    },
    // Experience & Education Items
    itemWrapper: {
      marginBottom: 12,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: '#222',
    },
    itemDate: {
      fontSize: 9,
      color: primaryColor,
      fontWeight: 500,
      backgroundColor: `${primaryColor}15`, // 15% opacity
      padding: '2 6',
      borderRadius: 4,
    },
    itemSubtitle: {
      fontSize: 11,
      fontWeight: 500,
      color: secondaryColor,
      marginBottom: 4,
      fontStyle: 'italic',
    },
    itemDescription: {
      fontSize: 10,
      color: '#444',
      lineHeight: 1.5,
      textAlign: 'justify',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 4,
    },
    tag: {
      fontSize: 8,
      backgroundColor: '#E5E7EB',
      padding: '2 6',
      borderRadius: 4,
      color: '#4B5563',
    },
  });

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const experiences = resume.experiences || [];
  const educations = resume.educations || [];
  const certificates = resume.certificates || [];
  const languages = resume.languages || [];
  const skills = resume.skills || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* === LEFT COLUMN (SIDEBAR) === */}
        <View style={styles.leftColumn}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} src={avatarUrl || DEFAULT_AVATAR} />
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitleSmall}>Liên hệ</Text>
            
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Điện thoại</Text>
              <Text style={styles.contactValue}>{resume?.candidate?.phone || "---"}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{email || "---"}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Cập nhật lần cuối</Text>
              <Text style={styles.contactValue}>{formatDate(resume?.resume?.updatedAt)}</Text>
            </View>
          </View>

          {/* Professional Skills (Sidebar) */}
          {skills.length > 0 && (
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitleSmall}>Kỹ năng</Text>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${(skill.level / 5) * 100}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Languages (Sidebar) */}
          {languages.length > 0 && (
            <View style={styles.contactSection}>
              <Text style={styles.sectionTitleSmall}>Ngôn ngữ</Text>
              {languages.map((lang, index) => (
                <View key={index} style={styles.langItem}>
                  <Text style={styles.langName}>{getLabelFromValue(LANGUAGE_OPTIONS, lang?.language)}</Text>
                  <Text style={styles.langLevel}>{lang.level}/5</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* === RIGHT COLUMN (MAIN CONTENT) === */}
        <View style={styles.rightColumn}>
          
          {/* Header */}
          <View style={styles.headerWrapper}>
            <View style={styles.headerText}>
              <Text style={styles.fullName}>{resume?.candidate?.fullName}</Text>
              <Text style={styles.positionTitle}>{resume?.resume?.title}</Text>
            </View>
            {/* Logo ở góc phải header */}
            <Image style={styles.logo} src={LOGO_IMAGE} />
          </View>

          {/* General Info Summary */}
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Thông tin chung</Text>
            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Vị trí:</Text>
                <Text style={styles.gridValue}>{getLabelFromValue(POSITION_OPTIONS, resume?.resume?.position)}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Kinh nghiệm:</Text>
                <Text style={styles.gridValue}>{getLabelFromValue(EXPERIENCE_OPTIONS, resume?.resume?.experience)}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Học vấn:</Text>
                <Text style={styles.gridValue}>{getLabelFromValue(ACADEMICLEVEL_OPTIONS, resume?.resume?.academicLevel)}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Hình thức:</Text>
                <Text style={styles.gridValue}>{getLabelFromValue(JOBTYPE_OPTIONS, resume?.resume?.jobType)}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Mức lương:</Text>
                <Text style={styles.gridValue}>
                    {resume?.resume?.salaryMin && resume?.resume?.salaryMax
                      ? `${(resume.resume.salaryMin / 1000000).toFixed(0)} - ${(resume.resume.salaryMax / 1000000).toFixed(0)} triệu`
                      : 'Thỏa thuận'}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Nơi làm việc:</Text>
                <Text style={styles.gridValue}>{getLabelFromValue(WORKPLACE_OPTIONS, resume?.resume?.typeOfWorkPlace)}</Text>
              </View>
            </View>
          </View>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Kinh nghiệm làm việc</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={styles.itemWrapper} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp?.jobName}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(exp?.startDate)} - {formatDate(exp?.endDate) || "Hiện tại"}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp?.companyName}</Text>
                  <Text style={styles.itemDescription}>{exp?.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Học vấn</Text>
              {educations.map((edu, index) => (
                <View key={index} style={styles.itemWrapper} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu?.degreeName} {edu?.major ? `- ${edu.major}` : ''}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(edu?.startDate)} - {formatDate(edu?.completedDate)}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu?.trainingPlace}</Text>
                  {edu?.description && <Text style={styles.itemDescription}>{edu?.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Chứng chỉ</Text>
              {certificates.map((cert, index) => (
                <View key={index} style={styles.itemWrapper} wrap={false}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{cert?.name}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(cert?.startDate)}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{cert?.trainingPlace}</Text>
                </View>
              ))}
            </View>
          )}

        </View>
      </Page>
    </Document>
  );
};

export default CVPdfDocument;