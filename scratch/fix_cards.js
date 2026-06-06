const fs = require('fs');
const path = require('path');

const files = [
  'src/app/dashboard/admin/attendance/page.tsx',
  'src/app/dashboard/admin/blogs/page.tsx',
  'src/app/dashboard/admin/members/page.tsx',
  'src/app/dashboard/admin/settings/page.tsx',
  'src/app/dashboard/admin/trainers/page.tsx',
  'src/app/dashboard/member/diets/page.tsx',
  'src/app/dashboard/member/page.tsx',
  'src/app/dashboard/member/progress/page.tsx',
  'src/app/dashboard/member/workouts/page.tsx',
  'src/app/dashboard/trainer/diets/page.tsx',
  'src/app/dashboard/trainer/page.tsx',
  'src/app/dashboard/trainer/schedules/page.tsx',
  'src/app/dashboard/trainer/workouts/page.tsx',
  'src/app/login/page.tsx',
  'src/app/register/page.tsx'
];

const basePath = 'h:/GYM project';

files.forEach(fileRel => {
  const filePath = path.join(basePath, fileRel);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace <Card border-white/5 hoverable={false} className="xyz"> 
  // or <Card className="xyz" border-white/5 hoverable={false}>
  // etc.
  
  // Let's do regex replacements
  // 1. Remove border-white/5 from Card and append to className if className exists, or add className="border border-white/5"
  // Specifically: border-white/5
  
  // Let's find occurrences of <Card ... >
  content = content.replace(/<Card([^>]*?)>/g, (match, p1) => {
    let propsStr = p1;
    let hasBorderWhite = propsStr.includes('border-white/5');
    let hasBorderPrimary = propsStr.includes('border-primary/20');
    let hasGlowBorder = propsStr.includes('glow-border-red');

    if (!hasBorderWhite && !hasBorderPrimary && !hasGlowBorder) {
      return match;
    }

    // Extract className if any
    let classNameRegex = /className=(?:"([^"]*?)"|{([^}]*?)})/g;
    let classNameMatch = classNameRegex.exec(propsStr);
    let classesToAdd = [];
    if (hasBorderWhite) classesToAdd.push('border border-white/5');
    if (hasBorderPrimary) classesToAdd.push('border border-primary/20');
    if (hasGlowBorder) classesToAdd.push('glow-border-red');

    // Remove the invalid props from the string
    propsStr = propsStr.replace(/\s+border-white\/5/g, '');
    propsStr = propsStr.replace(/\s+border-primary\/20/g, '');
    propsStr = propsStr.replace(/\s+glow-border-red/g, '');

    if (classNameMatch) {
      // It has className, let's append our classes inside it
      let fullClassNameAttr = classNameMatch[0];
      let classContent = classNameMatch[1] || '';
      let newClassContent = (classContent + ' ' + classesToAdd.join(' ')).trim();
      propsStr = propsStr.replace(fullClassNameAttr, `className="${newClassContent}"`);
    } else {
      // It does not have className, let's add it
      propsStr = `${propsStr} className="${classesToAdd.join(' ')}"`;
    }

    // Clean up multiple spaces
    propsStr = propsStr.replace(/\s+/g, ' ');

    return `<Card${propsStr}>`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${fileRel}`);
  } else {
    console.log(`No change: ${fileRel}`);
  }
});
