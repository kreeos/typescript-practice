export interface SSOUser {
  // SSO에 등록된 사용자를 나타냅니다.
  uid: string; // 사용자가 SSO 전체에서 고유하게 받은 ID입니다. 30자를 초과하지 않습니다.
  first_name: string; //사용자의 이름입니다. 30자를 초과하지 않습니다.
  last_name: string  // 사용자의 성입니다. 30자를 초과하지 않습니다.
  email: string // 사용자의 이메일 주소입니다. 인증된 이메일인지는 보장하지 않으며, 254자를 초과하지 않습니다.
  gender: string // 사용자의 성별입니다. *M (남성), *F (여성), *H (숨김), *E (기타) 또는 30자를 초과하지 않는 성별을 나타내는 문자열입니다.
  birthday: string  // 사용자의 생일입니다. YYYY-MM-DD 형식의 날짜 또는 빈 문자열 값입니다.
  point: number // 사용자의 포인트를 나타냅니다. 개발 전용 서비스와 실제 포인트 값은 분리되어 적용됩니다.
  flags: string[] // 사용자가 특별한 권한이 있는 경우 이를 표시합니다. 사용자가 테스트 기능이 있는 경우 TEST 문자열이, SPARCS 회원인 경우 SPARCS 문자열이 포함되어 있습니다.
  facebook_id: string // 사용자의 페이스북 고유 ID입니다. 연동하지 않았을 경우 빈 문자열입니다.
  twitter_id: string  // 사용자의 트위터 고유 ID입니다. 연동하지 않았을 경우 빈 문자열입니다.
  kaist_id: string  // 사용자의 KAIST 고유 ID입니다. 연동하지 않았을 경우 빈 문자열입니다.
  kaist_info: {} // 사용자의 KAIST Portal 데이터입니다. ku_std_no, kaist_uid, ku_psft_user_status_kor, employeeType, ku_person_type, ku_kaist_org_id, ku_psft_user_status, ku_acad_prog_code, ku_born_date, ku_person_type_kor, sn, mail, displayname, givenname, ku_sex, ku_kname의 데이터가 포함되어 있습니다.
  kaist_info_time: string // kaist_info를 업데이트한 날짜입니다. YYYY-MM-DD 형식의 날짜 또는 빈 문자열 값입니다.
  sparcs_id: string // 사용자의 SPARCS ID입니다. SPARCS 회원이 아닌 경우 빈 문자열 값입니다.
}