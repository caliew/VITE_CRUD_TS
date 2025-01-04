export const ROOT_PATH = '/';
// CMIS
export const CMIS_PATH = '/cmis';

// AUTH
export const NAVIGATE_AND_CLEAR_PATH = '/auth/navigate-clear';

// INTERCEPTION
export const EXTERNAL_LINK_INTERCEPTION = 'action=externallink';
export const STANDARD_PAGE_INTERCEPTION = 'action=standard';
export const UNAUTHORISED_PATH = `action=unauthorised`;
export const ACTION_BACK_PATH = `?action=back`;
export const ACTION_RELOAD_RELATED_PEOPLE_PATH = `?action=reloadrelatedpeople`;
export const ACTION_RELOAD_HEALTH_PROFILE_PATH = `?action=reloadhealthprofile`;
export const ACTION_HEALTH_PROFILES_PATH = '?action=healthprofile';
export const ACTION_RELOAD_USER_PROFILE_PATH = `?action=reloaduserprofile`;
export const DOWNLOAD_NATIVE_ACTION_TYPE = 'downloadnative';
export const DOWNLOAD_PDF_ACTION_TYPE = 'downloadpdf';
export const RADIOLOGY_REPORTS_PDF_ACTION_TYPE = 'radiologypdf';
export const BOOK_NSC_APPOINTMENT_TYPE = 'nsc';
export const NN_TRIAGE_QUESTIONNAIRE = 'triagequestionnaire';
export const PUBLIC_LOGIN_TYPE = 'publiclogin';

// HSG
export const HEALTHIERSG_NO_ACCESS_PATH = '/healthiersg/no-access';
export const HEALTHIERSG_ENROLLMENT_PATH = '/healthiersg/enrolment';
export const HEALTHIERSG_ENROLLMENT_CHANGE_PATH = '/healthiersg/enrolment/change';
export const HEALTHIERSG_ENROLLMENT_INTRO_PATH = '/healthiersg/enrolment/intro';
export const HEALTHIERSG_ENROLLMENT_INTROSPLASH_PATH = '/healthiersg/enrolment/intro-splash';
export const HEALTHIERSG_ENROLLMENT_INTROFIRSTSTEP_PATH = '/healthiersg/enrolment/first-step';
export const HEALTHIERSG_ENROLLMENT_TERMS_PATH = '/healthiersg/enrolment/terms';
export const HEALTHIERSG_ENROLLMENT_FILTER_PATH = '/healthiersg/enrolment/filter';
export const HEALTHIERSG_ENROLLMENT_CONFIRM_PATH = '/healthiersg/enrolment/confirm';
export const HEALTHIERSG_ENROLLMENT_COMPLETE_PATH = '/healthiersg/enrolment/complete';
export const HEALTHIERSG_ENROLLMENT_CARERECIPIENT_PATH = '/healthiersg/enrolment/care-recipient';
export const HEALTHIERSG_ENROLLMENT_MORE_OPTIONS_PATH = '/healthiersg/enrolment/more-options';
export const HEALTHIERSG_QUESTIONNAIRE_PATH = '/healthiersg/questionnaire';
export const HEALTHIERSG_QUESTIONNAIRE_COMPLETED_PATH = '/healthiersg/questionnaire/completed';
export const HEALTHIERSG_QUESTIONNAIRE_SCF_PATH = '/healthiersg/questionnaire/scf';
export const HEALTHIERSG_QUESTIONNAIRE_SMOKING_PATH = '/healthiersg/questionnaire/smoking';
export const HEALTHIERSG_QUESTIONNAIRE_SMOKING_DETAILS_PATH = '/healthiersg/questionnaire/smoking/details';
export const HEALTHIERSG_QUESTIONNAIRE_ONBOARDING_PATH = '/healthiersg/questionnaire/onboarding';
export const HEALTHIERSG_QUESTIONNAIRE_ONBOARDING_ANS_PATH = '/healthiersg/questionnaire/onboarding-answers';
export const HEALTHIERSG_HEALTHPLAN_PATH = '/healthiersg/health-plan';
export const HEALTHIERSG_RESULTSANDRECORDS_PATH = '/healthiersg/results-and-records';
export const HEALTHIERSG_ABOUT_PATH = '/healthiersg/about';
export const HEALTHIERSG_ENROLLMENT_CARERECIPIENT_CHANGE_PATH = '/healthiersg/enrolment/care-recipient/change';
export const HEALTHIERSG_ISENROLLED_ERROR_PATH = '/healthiersg/health-plan/unauthorized';
export const HEALTHIERSG_HEALTHPLAN_SIGNPOSTING_PATH = '/healthiersg/health-plan/signposting';
export const HEALTHIERSG_RECOMMENDATION_SIGNPOSTING_PATH = '/healthiersg/recommendation/signposting';
export const HEALTHIERSG_RESOURCES_RECOMMENDED_ARTICLES_PATH = '/healthiersg/health-plan/recommended-articles';
export const HEALTHIERSG_APPOINTMENT_FORM_PATH = '/healthiersg/enroled/appointment-form';
export const HEALTHIERSG_ENROLLMENT_EXISTING_APPOINTMENT_PATH = '/healthiersg/enrolment/existing-appointment';
export const HEALTHIERSG_HEALTHPLAN_VIEW_DISMISSED_ACTIONS_PATH = '/healthiersg/health-plan/dismissed-actions';
export const HEALTHIERSG_HEALTHPLAN_GET_VACCINATED_PATH = '/healthiersg/health-plan/get-vaccinated';
export const HEALTHIERSG_LIFESTYLEACTIONS_PATH = '/healthiersg/health-plan/lifestyle-actions';
export const HEALTHIERSG_RECOMMENDED_PROGRAMMES_AND_ACTIVITIES_PATH =
  '/healthiersg/health-plan/recommended-programmes-and-activities';
export const HEALTHIERSG_HEALTHPLAN_SCREENING_PATH = '/healthiersg/health-plan/screening';
export const HEALTHIERSG_RECORDS_SCREENING_PATH = '/healthiersg/records/screening';
export const HEALTHIERSG_RECORDS_IMMUNISATION_PATH = '/healthiersg/records/immunisation';
export const HEALTHIERSG_RESULTSANDRECORDS_EDIT_PATH = '/healthiersg/results-and-records/edit';
export const HEALTHIERSG_RECORDS_MANAGE_CONDITION_PATH = '/healthiersg/records/manage-condition';
export const HEALTHIERSG_HEALTHPLAN_SUMMARY_PATH = '/healthiersg/health-plan/summary';
export const HEALTHIERSG_WHATS_NEW_PATH = '/healthiersg/health-plan/whats-new';
export const HEALTHIERSG_RECOMMENDATION_INIT_PATH = '/healthiersg/recommendation/init';
export const HEALTHIERSG_PREVIOUS_HEALTHPLAN_PATH = '/healthiersg/health-plan/summary/previous-health-plan';
export const HEALTHIERSG_PREVIOUS_HEALTHPLAN_DETAIL_PATH =
  '/healthiersg/health-plan/summary/previous-health-plan-detail';

// PAYMENTS
export const PAYMENTS_CLUSTER_PATH = '/payments/cluster';
export const PAYMENTS_OUTSTANDING_PATH = '/payments/outstanding';
export const PAYMENTS_ADD_BILL_PATH = '/payments/add-bill';
export const PAYMENTS_SUMMARY_PATH = '/payments/summary';
export const PAYMENTS_CHECK_STATUS_PATH = '/payments/check-status';
export const PAYMENTS_PUBLIC_CHECKSTATUS_PATH = '/public/payments/check-status';
export const PAYMENTS_RECEIPT_PATH = '/payments/receipt';
export const PAYMENTS_PUBLIC_RECEIPT_PATH = '/public/payments/receipt';
export const PAYMENTS_DD_RECEIPT_PATH = '/payments/dd-receipt';
export const PAYMENTS_PUBLIC_BILLS_PATH = '/public/payments/bills';
export const PAYMENTS_PUBLIC_ADD_BILL_PATH = '/public/payments/add-bill';
export const PAYMENTS_SUMMARY_PUBLIC_PATH = '/public/payments/summary';

// LAB RESULTS
export const COMMON_LAB_TEST_RESULTS_PATH = '/health-records/lab-results';
export const COMMON_LAB_TEST_RESULTS_DETAILS_PATH = '/health-records/lab-results/details';

// PRESCRIPTION
export const PRESCRIPTION_PATH = '/health-records/prescription';
export const PRESCRIPTION_DETAILS_PATH = '/health-records/prescription/details';

// IMMUNISATION RECORDS
export const IMMUNISATION_RECORDS_PATH = '/health-records/immunisation-records';
export const MORE_ABOUT_IMMUNISATION_PATH = '/health-records/immunisation-records/more-about-immunisation';
export const COMPLETED_IMMUNISATIONS_PATH = '/health-records/immunisation-records/completed-immunisations';
export const VACCINATION_RECORDS_PATH = '/health-records/immunisation-records/vaccination-records';
export const COVID_19_RECORD_PATH = '/health-records/immunisation-records/covid-records';
export const PCR_TESTS_PATH = '/health-records/immunisation-records/pcr-tests';
export const SEROLOGY_TESTS_PATH = '/health-records/immunisation-records/serology-tests';
export const ANTIGEN_RAPID_TESTS_PATH = '/health-records/immunisation-records/antigen-rapid-tests';
export const NATIONALLY_RECOMMENDED_PATH = '/health-records/immunisation-records/nationally-recommended';
export const UPCOMING_IMMUNISATION_PATH =
  '/health-records/immunisation-records/nationally-recommended/upcoming-immunisation';
export const MISSED_IMMUNISATION_PATH =
  '/health-records/immunisation-records/nationally-recommended/missed-immunisation';

// NEHR ACCESS HISTORY
export const NEHR_ACCESS_HISTORY_PATH = '/health-records/access-history';
export const PUBLIC_HEALTHCARE_CLUSTERS_PATH = '/health-records/public-healthcare-clusters';

// SCREENING
export const RECORDS_SCREENING_LETTER_PATH = '/health-records/screening/letter';

// HEALTH_SCREENING
export const HEALTH_SCREENING_PATH = '/health-records/health-screening';
export const HEALTH_SCREENING_SCREENING_TYPE_SUMMARY_PATH = '/health-records/health-screening/:screeningType';
export const HEALTH_SCREENING_DETAILS_PATH = '/health-records/health-screening/details/:screeningType';
export const HEALTH_SCREENING_UNDERSTAND_MY_READINGS_PATH =
  '/health-records/health-screening/understand-my-readings/:screeningType';

// DISCHARGE SUMMARY
export const DISCHARGE_SUMMARY_PATH = '/health-records/discharge-summary';
export const DISCHARGE_SUMMARY_DETAIL_PATH = '/health-records/discharge-summary/:id';

// RADIOLOGY
export const RADIOLOGY_PATH = '/health-records/radiology';
export const RADIOLOGY_DETAILS_PATH = '/health-records/radiology/details';

// CHAS
export const CHAS_PATH = '/health-records/chas';
export const CHAS_SUBSIDY_BALANCE_PATH = '/health-records/chas/subsidy-balance/:chasType';
export const CHAS_VISIT_BALANCE_PATH = '/health-records/chas/visit-balance';
export const CHAS_DENTAL_SUBSIDY_BALANCE_PATH = '/health-records/chas/dental-subsidy-balance/:tab';
export const CHAS_TRANSACTION_HISTORY_PATH = '/health-records/chas/transaction-history';

// CAREGIVERS
export const MY_CARE_GIVERS_PATH = '/caregivers';
export const UPDATE_CARE_GIVERS_DETAILS_PATH = '/caregivers/update';
export const ADD_CARE_GIVERS_PATH = '/caregivers/add';
export const UPDATE_CARE_GIVERS_SUCCESS_PATH = '/caregivers/update/status';
export const ADD_CARE_GIVERS_RECORDS_PATH = '/caregivers/record/add';
export const ADD_CAREGIVERS_RECEIVED_APPROVAL_PATH = '/caregivers/received/approval';
export const ADD_CAREGIVERS_RECEIVED_DETAILS_PATH = '/caregivers/received/details';
export const ADD_CAREGIVERS_RECEIVED_MANAGE_ACCESS_PATH = '/caregivers/received/access';
export const ADD_CARE_GIVERS_SUCCESS_PATH = '/caregivers/add/status';
export const CARE_GIVERS_ADD_FAMILY_FRIEND_PATH = '/family-friends-health/accept';
export const CARE_GIVERS_ADD_FAMILY_FRIEND_MORE_INFORMATION_PATH = '/family-friends-health/information';
export const CARE_GIVERS_FILL_MY_INFO_PATH = '/caregivers/fill-my-info';
export const ACCEPT_CAREGIVERS_FILL_MY_INFO_PATH = '/caregivers/accept/fill-my-info';

// CARE_RECIPIENTS
export const ADD_CARE_RECIPIENT_PATH = '/family-friends-health/care-recipient/add';
export const UPDATE_CARE_RECIPIENT_PATH = '/family-friends-health/care-recipient/update';
export const ADD_CARE_RECIPIENT_SUCCESS_PATH = '/family-friends-health/care-recipient/add/status';
export const UPDATE_CARE_RECIPIENT_SUCCESS_PATH = '/family-friends-health/care-recipient/update/status';
export const CARE_RECIPIENT_FILL_MY_INFO_PATH = '/family-friends-health/care-recipient/fill-my-info';

// CHILDREN HEALTH
export const ADD_CHILDREN_HEALTH_PATH = '/children-health/care-recipient/add';
export const UPDATE_CHILDREN_HEALTH_PATH = '/children-health/care-recipient/update';
export const ADD_CHILDREN_HEALTH_SUCCESS_PATH = '/children-health/care-recipient/add/status';
export const UPDATE_CHILDREN_HEALTH_SUCCESS_PATH = '/children-health/care-recipient/update/status';
export const HEALTH_RECORDS_BIRTH_INFORMATION_PATH = '/children-health/birth-information';

export const CHILDREN_HEALTH_MILESTONES_PATH = '/children-health/milestones';
export const CHILDREN_HEALTH_MILESTONES_TODO_PATH = '/children-health/milestones/todo';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_PHASE_PATH = '/children-health/milestones/by-phase';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_PHASE_DETAILS_PATH = '/children-health/milestones/by-phase/:id';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_AGE_PATH = '/children-health/milestones/by-age';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_AGE_ITEM_PATH = '/children-health/milestones/by-age/:itemId';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_AGE_ARCHIVED_PATH =
  '/children-health/milestones/by-age/:itemId/archived';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_AGE_ARCHIVED_DETAILS_PATH =
  '/children-health/milestones/by-age/:itemId/archived/:id';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_AGE_ITEM_DETAILS_PATH =
  '/children-health/milestones/by-age/:itemId/details/:id';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_CATEGORIES_PATH = '/children-health/milestones/by-categories';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_CATEGORIES_ITEM_PATH =
  '/children-health/milestones/by-categories/:itemId';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_CATEGORIES_ARCHIVED_PATH =
  '/children-health/milestones/by-categories/:itemId/archived';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_CATEGORIES_ARCHIVED_DETAILS_PATH =
  '/children-health/milestones/by-categories/:itemId/archived/:id';
export const CHILDREN_HEALTH_MILESTONES_LIST_BY_CATEGORIES_ITEM_DETAILS_PATH =
  '/children-health/milestones/by-categories/:itemId/details/:id';

export const SCHOOL_DENTAL_RECORDS_PATH = '/children-health/dental';
export const SCHOOL_DENTAL_RECORD_DETAILS_PATH = '/children-health/dental/details';
export const SCHOOL_HEALTH_ASSESSMENT_SUMMARY_PATH = '/children-health/health-screening';
export const SCHOOL_HEALTH_ASSESSMENT_SUMMARY_DETAILS_PATH = '/children-health/health-screening/details';
export const SCHOOL_REMINDER_LETTERS_PATH = '/children-health/reminder-letters';
export const SCHOOL_REMINDER_LETTERS_DETAILS_PATH = '/children-health/reminder-letters/details';
export const CHILDREN_HEALTH_RECORDS_REFERRAL_LETTERS_PATH = '/children-health/referral-letters';
export const CHILDREN_HEALTH_RECORDS_REFERRAL_LETTERS_DETAILS_PATH = '/children-health/referral-letters/details';
export const GROWTH_CHARTS_PATH = '/children-health/growth-charts';
export const GROWTH_CHARTS_ENTRIES_PATH = '/children-health/growth-charts/entries';
export const ADD_GROWTH_ENTRY_PATH = '/children-health/growth-charts/add-entry';
export const EDIT_GROWTH_ENTRY_BASE_PATH = '/children-health/growth-charts/edit';
export const EDIT_GROWTH_ENTRY_PATH = '/children-health/growth-charts/edit/:progressId';

// NOTIFICATIONS
export const SCHOOL_HEALTH_NOTIFICATIONS_PATH = '/notification/school-health';
export const CHILDREN_HEALTH_NOTIFICATIONS_PATH = '/notification/children-health';

// APPOINTMENT
export const APPOINTMENT_DETAIL_PATH = '/appointments/dashboard';

export const APPOINTMENT_RESCHEDULE_PATH = '/appointments/reschedule';
export const APPOINTMENT_RESCHEDULE_LINKED_PATH = '/appointments/reschedule-linked';
export const APPOINTMENT_RESCHEDULE_CONFIRM_PATH = '/appointments/reschedule/confirm';
export const APPOINTMENT_RESCHEDULE_SUCCESS_PATH = '/appointments/reschedule/success';

export const APPOINTMENT_BOOK_NEXT_PATH = '/appointments/book-next';
export const APPOINTMENT_BOOK_NEXT_CONFIRM_PATH = '/appointments/book-next/confirm';
export const APPOINTMENT_BOOK_NEXT_SUCCESS_PATH = '/appointments/book-next/success';
export const APPOINTMENT_BOOK_NEXT_NUHS_PATH = '/appointments/book-next/nuhs';
export const APPOINTMENT_BOOK_NEXT_NUHS_SUCCESS_PATH = '/appointments/book-next/nuhs/success';

export const APPOINTMENT_MAKE_NEW_PATH = '/appointments/make-new';
export const APPOINTMENT_MAKE_NEW_PREFERRED_POLYCLINIC_PATH = '/appointments/make-new/setup-preferred-polyclinic';
export const APPOINTMENT_MAKE_NEW_BOOK_POLYCLINIC_PATH = '/appointments/make-new/book-polyclinic';
export const APPOINTMENT_MAKE_NEW_CONFIRM_PATH = '/appointments/make-new/book-polyclinic/confirm';
export const APPOINTMENT_MAKE_NEW_SUCCESS_PATH = '/appointments/make-new/book-polyclinic/success';
export const APPOINTMENT_MAKE_NEW_FAILURE_PATH = '/appointments/make-new/book-polyclinic/failure';
export const APPOINTMENT_MAKE_NEW_VIDEO_CONSULT_GENERAL_CONDITIONS_PATH =
  '/appointments/make-new/book-polyclinic/video-consult-general-conditions';
export const APPOINTMENT_MAKE_NEW_VIDEO_CONSULT_GENERAL_CONDITIONS_AVAILABLE_SLOT_PATH =
  '/appointments/make-new/book-polyclinic/video-consult-general-conditions/available-slot-selection';
export const APPOINTMENT_MAKE_NEW_SELECT_SERVICE_TYPE_PATH =
  '/appointments/make-new/book-polyclinic/select-service-type';
export const APPOINTMENT_MAKE_NEW_SELECT_LOCATION_PATH = '/appointments/make-new/book-polyclinic/select-location';
export const APPOINTMENT_MAKE_NEW_SELECT_DOCTOR_PATH = '/appointments/make-new/book-polyclinic/select-doctor';

export const APPOINTMENT_REQUEST_FORM_WITHOUT_TYPE_PATH = '/appointments/make-new/form/request-form';
export const APPOINTMENT_REQUEST_FORM_PATH = `${APPOINTMENT_REQUEST_FORM_WITHOUT_TYPE_PATH}/:formType`;
export const APPOINTMENT_REQUEST_FORM_SUCCESS_PATH = '/appointments/make-new/form/request-form-success';
export const APPOINTMENT_CERVICAL_CANCER_FORM_PATH = '/appointments/make-new/form/cervical-cancer';
export const APPOINTMENT_CERVICAL_CANCER_FORM_SUCCESS_PATH = '/appointments/make-new/form/cervical-cancer/success';
export const APPOINTMENT_BREAST_CANCER_FORM_PATH = '/appointments/make-new/form/breast-cancer';
export const APPOINTMENT_BREAST_CANCER_FORM_SUCCESS_PATH = '/appointments/make-new/form/breast-cancer/success';
export const APPOINTMENT_TRIAGE_QUESTIONNAIRE_PATH = '/appointments/make-new/triage-questionnaire';
export const APPOINTMENT_DEDICATED_ATTENTION_PATH = '/appointments/make-new/triage-questionnaire/dedicated-attention';
export const APPOINTMENT_CONFIRM_PATIENT_RECORD_PATH = '/appointments/make-new/confirm-patient-record';
export const APPOINTMENT_CONFIRM_PATIENT_RECORD_SUCCESS_PATH = '/appointments/make-new/confirm-patient-record/success';
export const APPOINTMENT_CONFIRM_PATIENT_RECORD_ERROR_PATH = '/appointments/make-new/confirm-patient-record/error';
export const APPOINTMENT_BEFORE_CARE_PATH = '/appointments/make-new/before-care';

export const APPOINTMENT_REGISTRATION_PATH = '/appointments/registration';
export const APPOINTMENT_REGISTRATION_QUEUE_STATUS_AND_JOURNEY_PATH =
  '/appointments/registration/queue-status-journey/:encounter';
export const APPOINTMENT_REGISTRATION_QUEUE_JOURNEY_PATH = '/appointments/registration/queue-journey/:encounter';

export const APPOINTMENT_PRE_CONSULT_QUESTIONNAIRE_INTRODUCE_PATH = '/appointments/pre-consult-questionnaire/introduce';
export const APPOINTMENT_PRE_CONSULT_QUESTIONNAIRE_QUESTION_SECTION_PATH =
  '/appointments/pre-consult-questionnaire/question-section';
export const APPOINTMENT_PRE_CONSULT_QUESTIONNAIRE_REVIEW_PATH = '/appointments/pre-consult-questionnaire/review';
export const APPOINTMENT_PRE_CONSULT_QUESTIONNAIRE_SUCCESS_PATH = '/appointments/pre-consult-questionnaire/success';

export const APPOINTMENT_ACCOMPANYING_VISITORS_PATH = '/appointments/accompanying-visitors';
export const APPOINTMENT_ACCOMPANYING_VISITOR_ADDING_PATH = '/appointments/accompanying-visitors/:addType';

export const APPOINTMENT_SWITCH_USER_PATH = '/appointments/switch-user';

// MY HEALTH PROFILE
export const MY_HEALTH_PROFILE_BASE_PATH = `/personal-health`;
export const MY_HEALTH_PROFILE_PATH = `${MY_HEALTH_PROFILE_BASE_PATH}/:tab?`;

// FAMILY AND FRIENDS HEALTH PROFILE
export const MY_FAMILY_AND_FRIEND_HEALTH_PROFILE_BASE_PATH = `/family-friends-health/profile`;
export const MY_FAMILY_AND_FRIEND_HEALTH_PROFILE_PATH = `${MY_FAMILY_AND_FRIEND_HEALTH_PROFILE_BASE_PATH}/:tab?`;

// CHILDREN HEALTH PROFILE
export const MY_CHILDREN_PROFILE_BASE_PATH = '/children-health/profile';
export const MY_CHILDREN_HEALTH_PROFILE_PATH = `${MY_CHILDREN_PROFILE_BASE_PATH}/:tab?`;

// PERSONAL HEALTH
export const MY_PROFILE_PATH = '/my-profile';

// MEDREFILL
export const MEDREFILL_INSTITUTION_PATH = '/medrefill/institutions';
export const MEDREFILL_ORIGINAL_DETAILS_PATH = '/medrefill/original-details';
export const MEDREFILL_ORDER_TYPE_PATH = '/medrefill/order-type';
export const MEDREFILL_POLYCLINICS_PATH = '/medrefill/institutions/polyclinics';
export const MEDREFILL_REFILL_OPTIONS_PATH = '/medrefill/refill-options';
export const MEDREFILL_PAYMENT_MODE_PATH = '/medrefill/select-payment-mode';
export const MEDREFILL_PRESCRIPTION_LIST_PATH = '/medrefill/prescriptions';
export const MEDREFILL_ADD_PARTICULARS_PATH = '/medrefill/add-particulars';
export const MEDREFILL_SUMMARY_PATH = '/medrefill/summary';
export const MEDREFILL_COLLECTIONS_PATH = '/medrefill/collections';

export const MEDREFILL_CLINICS_PATH = '/medrefill/clinics';
export const MEDREFILL_PRESCRIBED_MEDICATION_PATH = '/medrefill/prescribed-medications';
export const MEDREFILL_SORT_FILTER_PATH = '/medrefill/sort-filter';
export const MEDREFILL_SUCCESSFUL_REQUEST_PATH = '/medrefill/successful-request';
export const MEDREFILL_UNSUCCESSFUL_REQUEST_PATH = '/medrefill/unsuccessful-request';

// MEDREFILL PUBLIC
export const MEDREFILL_PUBLIC_LANDING_PATH = '/public/medrefill/landing';
export const MEDREFILL_PUBLIC_INSTITUTION_PATH = '/public/medrefill/institutions';
export const MEDREFILL_PUBLIC_CLINICS_PATH = '/public/medrefill/clinics';
export const MEDREFILL_PUBLIC_POLYCLINICS_PATH = '/public/medrefill/institutions/polyclinics';
export const MEDREFILL_PUBLIC_ORDER_TYPE_PATH = '/public/medrefill/order-type';
export const MEDREFILL_PUBLIC_ORIGINAL_DETAILS_PATH = '/public/medrefill/original-details';
export const MEDREFILL_PUBLIC_PRESCRIPTION_LIST_PATH = '/public/medrefill/prescriptions';
export const MEDREFILL_PUBLIC_REFILL_OPTIONS_PATH = '/public/medrefill/refill-options';
export const MEDREFILL_PUBLIC_ADD_PARTICULARS_PATH = '/public/medrefill/add-particulars';
export const MEDREFILL_PUBLIC_SUMMARY_PATH = '/public/medrefill/summary';
export const MEDREFILL_PUBLIC_COLLECTIONS_PATH = '/public/medrefill/collections';
export const MEDREFILL_PUBLIC_PAYMENT_MODE_PATH = '/public/medrefill/select-payment-mode';
export const MEDREFILL_PUBLIC_SUCCESSFUL_REQUEST_PATH = '/public/medrefill/successful-request';
export const MEDREFILL_PUBLIC_UNSUCCESSFUL_REQUEST_PATH = '/public/medrefill/unsuccessful-request';

// MEDREFILL HISTORY
export const MEDREFILL_HISTORY_PATH = '/medrefill-history';
export const MEDREFILL_HISTORY_PAST_ORDER_PATH = '/medrefill-history/past-order';

// FINANCIAL_CONSENTS
export const FINANCIAL_CONSENTS_PATH = '/health-records/financial-consents';
export const FINANCIAL_CONSENTS_MCAF_PATH = '/health-records/financial-consents/mcaf';
export const FINANCIAL_CONSENTS_TERM_AND_CONDITIONS = '/health-records/financial-consents/term-and-conditions';
export const FINANCIAL_CONSENTS_DEFINITIONS = '/health-records/financial-consents/definitions';

// HEALTH ASSESSMENT
export const HEALTH_RISK_ASSESSMENT_PATH = '/health-records/hra';
export const HEALTH_RISK_ASSESSMENT_DETAILS_PATH = '/health-records/hra/details';

// MRRP
export const MRRP_MEDICAL_REPORTS_LANDING_PATH = '/medical-reports';
export const MRRP_MEDICAL_REPORTS_VIEW_SELECT_INSTITUTION_PATH = '/medical-reports/view-request/select-institution';
export const MRRP_MEDICAL_REPORTS_LISTING_PATH = '/medical-reports/view-request/summary';
export const MRRP_MEDICAL_REPORTS_DETAILS_PATH = '/medical-reports/view-request/summary/:id';
export const MRRP_MEDICAL_REPORTS_NEW_SELECT_INSTITUTION_PATH = '/medical-reports/new-request/select-institution';
export const MRRP_MEDICAL_REPORTS_TNC_PATH = '/medical-reports/new-request/select-institution/terms-and-condition';
export const MRRP_MEDICAL_REPORTS_TNC_DETAILS_PATH =
  '/medical-reports/new-request/select-institution/terms-and-condition/details';
export const MRRP_MEDICAL_REPORTS_PATIENT_NOT_FOUND_PATH = '/medical-reports/new-request/select-institution/not-found';
export const MRRP_MEDICAL_REPORTS_REPORTS_DETAILS_PATH = '/medical-reports/new-request/report-details';
export const MRRP_MEDICAL_REPORTS_PARTICULARS_PATH = '/medical-reports/new-request/particulars';
export const MRRP_MEDICAL_REPORTS_COLLECTION_PATH = '/medical-reports/new-request/collection';
export const MRRP_MEDICAL_REPORTS_REQUEST_SUMMARY_PATH = '/medical-reports/new-request/summary';
export const MRRP_MEDICAL_REPORTS_REQUEST_PAYMENT_PATH = '/medical-reports/new-request/payment';
export const MRRP_MEDICAL_REPORTS_REQUEST_PAYMENT_STATUS_PATH = '/medical-reports/new-request/payment/status';
export const MRRP_MEDICAL_REPORTS_REQUEST_PAYMENT_COMPLETED_PATH = '/medical-reports/new-request/payment/completed';

// DIRECTORY
export const DIRECTORY_LISTING_PATH = '/directory';
export const DIRECTORY_INSTITUTION_PATH = '/directory/institution';
