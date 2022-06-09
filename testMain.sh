#! /bin/bash

node fillForm.js << EOF > /dev/null
james
1234-56-78
cricket,football
1234567890
Eiffel Tower
Paris
EOF
 
ACTUAL_RESPONSES=$( cat form.json )

EXPECTED_RESPONSES='{"name":"james","dob":"1234-56-78","hobbies":["cricket","football"],"phoneNumber":"1234567890","address":"Eiffel Tower\nParis"}'


TEST_RESULT='❌'
MESSAGE='Should fill a form with given responses'

if [[ "${ACTUAL_RESPONSES}" == "${EXPECTED_RESPONSES}" ]] 
then  
  TEST_RESULT='✅'
fi

echo "${TEST_RESULT} ${MESSAGE}"
