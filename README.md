## Khmer Auto Suggest Tool

KAST គឺ​ជា​ឧបករណ៍​ដែល​ប្រើ​សំរាប់​បង្ហាញ​នូវ​អក្ខរាវិរុទ្ធ​ដែល​មាន​សំណេរ​ស្រដៀង​គ្នា ។ វា​ផ្ដល់​លទ្ធភាព​ងាយ​ស្រួល​ដល់​អ្នក​សរសេរ​អោយ​ធ្វើ​ការ​ត្រួត​ពិនិត្យ​ពាក្យ​របស់​ខ្លួន​មុន​នឹង​សំរេច​យក​។

### Architecture Design
![architecture](/https://drive.google.com/file/d/0B2sVNz0Ww1Qgb0FrLXVnc0xSUjA/edit?usp=sharing)

គោល​បំណង​នៃ​កម្ម​វិធី​នេះ​គឺ​នៅ​រាល់​ពេល​ដែល​អ្នក​ប្រើ​ប្រាស់​ចាប់​ផ្ដើម​វាយ​បញ្ចូល​អក្សរ​ខ្មែរ​ក្នុង​គេហទំព័រ​ណា​មួយ​ក្ដី​ វា​នឹង​ត្រូវ​បង្ហាញ​ចេញ​នូវ​សំណើរ​ពាក្យ​អក្ខរាវិរុទ្ធ​ ដើម្បី​អោយ​គេ​ជ្រើស​រើស​ ។ តើ​ធ្វើ​ដូចម្ដេច​ដើម្បី​បង្ហាញ​ប្រអប់​នោះ  បើ​យើង​មិន​មែន​ជា​ម្ចាស់​កូដ​របស់​គេហទំព័រ​ទាំង​នោះ​ផង? 

យើង​ប្រើ​ការ​ចាក់​បញ្ចូល​កូដ​ថ្មី​ដែល​ជា​កូដ​របស់​យើង​ចូល​ក្នុង​គេហទំព័រ​ទាំង​នោះ​ តាម​រយៈ​ Technology មួយ​ដែល​គេ​អោយ​ឈ្មោះ​ថា​ [Content Script](http://developer.chrome.com/extensions/content_scripts.html) ជា​ផ្នែក​មួយ​នៃ​ Google Chrome Extension Functionality ។

### Foreground Task
ផ្នែក​នេះ​ត្រូវ​ទទួល​ខុស​ត្រូវ​ដោយ​ [content.js](https://github.com/varmansvn/kast/blob/master/content.js) ដែល​យើង​បាន​ចាក់​បញ្ចូល​ក្នុង​គេហទំព័រ ។ ទាំង​នេះ​ជា​ការងារ​របស់​វា៖
- ផ្ញើរ​សារ​ទៅ​ [background.js](https://github.com/varmansvn/kast/blob/master/background.js) ដើម្បី​ទាញ​យក​វចនានុក្រម ។
- យក​វចនានុក្រម​នោះ​ទំលាក់​ចូល​ក្នុង​ [Auto-Complete Widget](http://jqueryui.com/autocomplete/) ។ យើង​មិន​ចាំ​បាច់​ខ្វល់​ថា​តើ​ស្វែង​រក​ពាក្យ​យ៉ាង​ម៉េច​ទេ​ព្រោះ​នោះ​ជា​ការងារ​របស់​វា​ស្រាប់ ។ 
- ចុះ​ឈ្មោះ​បង្កើត​ Event Handler សំរាប់​គ្រប់​ input box ហើយ​និង​ textarea box ។ ដើម្បី​ចាប់​អោយ​បាន​នូវ​ Event ដែល​អ្នក​ប្រើ​ប្រាស់​វាយ​បញ្ចូល​អក្សរ​ យើង​ចាំ​បាច់​ត្រូវ​ស្ដាប់​នូវ​រាល់​ការ​វាយ​បញ្ចូល​នៃ​តួរ​អក្សរ​ម្ដង​មួយ​តួ​ៗ ។

### Background Task
ផ្នែក​នេះ​ត្រូវ​ទទួលខុស​ត្រូវ​ដោយ​ [background.js](https://github.com/varmansvn/kast/blob/master/background.js) ។ ការងារ​របស់​វា​មាន​ពីរ​ចំណុច​សំខាន់​ៗ៖
- ទាញ​យក​ទិន្នន័យ​ចេញ​ពី​ [data.json](https://github.com/varmansvn/kast/blob/master/js/data.json) ដើម្បី​បង្កើត​ជា​ List of objects ដែល object និមួយ​ៗនោះ​គឺ​តំណាង​អោយ​មួយ​ពាក្យ​គន្លឺះ ។
- ទទួល​បក​ប្រែ​សារ​ដែល​គេ​ផ្ញើរ​អោយ​វា​ ។ ក្នុង​ករណី​នេះ យើង​មាន​តែ​មួយ​សារ​គត់​គឺ GET-DICTIONARY ដែល​សារ​មាន​ន័យ​ថា​ខាង Foreground គេ​ត្រូវ​ការ​ទិន្នន័យ​ដែល​យក​ចេញ​ពី data.json ខាងលើ ។ តែ​ទិន្នន័យ​នោះ​ត្រូវ​ស្ថិត​ក្នុង​ទំរង់​ List of objects ។

### Datastore
ទិន្នន័យ​ដែល​ជា​ស្នូល​សំខាន់​នៃ​គំរោង​នេះ​គឺ​ [data.json](https://github.com/varmansvn/kast/blob/master/js/data.json) ដែលជា​Array នៃ JSON String ។ ខ្ញុំ dump ទិន្នន័យ​ចេញ​ពី​ [វចនានុក្រមខ្មែររបស់វិទ្យាស្ថាន​ពុទ្ធសាសន​បណ្ឌិត្យ​​​​](http://www.khmerbuddhism.net/index.php?option=com_content&view=article&id=70) ដែល​ជា​ស្នា​ព្រហស្ថ​ផ្ទាល់​របស់​សម្ដេច​ព្រះ​សង្ឃ​រាជ​ជួន ណាត ។







