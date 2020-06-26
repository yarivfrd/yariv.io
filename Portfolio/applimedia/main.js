
let mediaApp = {};

mediaApp.header = document.querySelector('header');
mediaApp.view = document.querySelector('#app-view');
mediaApp.tabContainer = document.querySelector('#app-view > main');
mediaApp.closeTabBtn = document.querySelector('.close-tab-btn');

mediaApp.selectedTab;
mediaApp.selectedItem;
mediaApp.preview;

document.addEventListener('click', (e) => {


    // Main Tab
    if (e.target.classList.contains('main-tab')) {

        document.body.classList.add('full-screen-tab');

        mediaApp.selectedTab = e.target;
        mediaApp.selectedTab.classList.add('expanded', 'full-screen-show');
        mediaApp.selectedTab.style.transform = 'translate(var(--wrapper-width), ' + mediaApp.calcDistanceFromTop(e.target) * -1 + 'px)';

        mediaApp.closeTabBtn.classList.remove('hidden');
        mediaApp.closeTabBtn.classList.add('full-screen-show');

    } else if (e.target.parentElement.classList.contains('inner') && e.target.parentElement.parentElement.classList.contains('main-tab')) {

        document.body.classList.add('full-screen-tab');

        mediaApp.selectedTab = e.target.parentElement.parentElement;
        mediaApp.selectedTab.classList.add('expanded', 'full-screen-show');
        mediaApp.selectedTab.style.transform = 'translate(var(--wrapper-width), ' + mediaApp.calcDistanceFromTop(e.target.parentElement.parentElement) * -1 + 'px)';

        mediaApp.closeTabBtn.classList.remove('hidden');
        mediaApp.closeTabBtn.classList.add('full-screen-show');

    } else if (e.target.classList.contains('inner') && e.target.parentElement.classList.contains('main-tab')) {



        document.body.classList.add('full-screen-tab');

        mediaApp.selectedTab = e.target.parentElement;
        mediaApp.selectedTab.classList.add('expanded', 'full-screen-show');
        mediaApp.selectedTab.style.transform = 'translate(var(--wrapper-width), ' + mediaApp.calcDistanceFromTop(e.target.parentElement) * -1 + 'px)';

        mediaApp.closeTabBtn.classList.remove('hidden');
        mediaApp.closeTabBtn.classList.add('full-screen-show');

    }

    // Close Button
    if (e.target.className === 'close-tab-btn full-screen-show' && !document.body.classList.contains('preview')) {

        document.body.classList.remove('full-screen-tab');

        mediaApp.selectedTab.classList.remove('expanded', 'full-screen-show');
        mediaApp.selectedTab.style.transform = '';

        mediaApp.closeTabBtn.classList.add('hidden');
        mediaApp.closeTabBtn.classList.remove('full-screen-show');

    } else if (e.target.className === 'close-tab-btn full-screen-show' && document.body.classList.contains('preview')) {

        document.body.classList.remove('preview')

        mediaApp.selectedItem.classList.remove('selected');
        mediaApp.selectedItem.style.left = '';
        mediaApp.selectedItem.style.top = '';

        mediaApp.preview.classList.remove('active');
        mediaApp.selectedItem.classList.remove('selected');

    }

    // Media Item
    if (e.target.classList.contains('thumb')) {

        document.body.classList.add('preview');

        mediaApp.selectedItem = e.target.parentElement;
        mediaApp.selectedItem.classList.add('selected');

        mediaApp.preview = e.path[5].children[2];
        mediaApp.preview.classList.add('active');

        mediaApp.setItemContent(mediaApp.selectedItem)
        mediaApp.moveItemToPreview(mediaApp.selectedItem);

    }

});

document.addEventListener('dragstart', (e) => {

    e.preventDefault();
    let dragged = e.target;

    if (dragged.children[0].classList.contains('thumb')) {
        alert("מנסה לגלול לצד? אני מאתגר אותך להוסיף את הפיצ'ר :) נקודות בונוס למי שלא משתמש בספריה חיצונית!");
    }

});

mediaApp.calcDistanceFromTop = function (el) {

    let viewTopPadding = Number(window.getComputedStyle(mediaApp.view).getPropertyValue("padding-top").replace(/\D/g, ''));
    let headerHeight = mediaApp.header.clientHeight + Number(window.getComputedStyle(mediaApp.header).getPropertyValue("margin-bottom").replace(/\D/g, ''));
    let distance = headerHeight + viewTopPadding;

    for (let elIndex = 0; mediaApp.tabContainer.children[elIndex] !== el; elIndex++) {
        distance += mediaApp.tabContainer.children[elIndex].clientHeight + Number(window.getComputedStyle(mediaApp.tabContainer.children[elIndex]).getPropertyValue("margin-bottom").replace(/\D/g, ''));
    }

    return distance;

}

mediaApp.moveItemToPreview = function (el) {

    // The desired item positon on preview (relative to app view)
    let previewX = 131;
    let previewY = 90;

    previewX = (el.offsetLeft + el.offsetParent.offsetLeft) - previewX;
    previewY = (el.offsetTop + el.offsetParent.offsetTop) - previewY;

    el.style.left = (previewX * -1) + 'px';
    el.style.top = (previewY * -1) + 'px';

}

mediaApp.setItemContent = function (el, tabPreview) {

    let backgroundImage = mediaApp.preview.children[0];
    let title = mediaApp.preview.children[1].children[0];
    let releaseDate = mediaApp.preview.children[1].children[1];
    let description = mediaApp.preview.children[3];

    switch (el.classList[0]) {

        // Movies
        case 'men-in-black-3':

            backgroundImage.style.background = 'url(img/men-in-black-back.jpg) no-repeat top center'
            title.textContent = 'גברים בשחור';
            releaseDate.textContent = 2012;
            description.textContent = 'גברים בשחור 3 הוא הפרק השלישי בסדרת פנטזיית הפעולה האהובה על הסוכנים גיי וקיי הדואגים לחיסולם של חוצנים המאיימים לפלוש לשטחה של ארצות הברית ולאיים על העולם כולו.';

            break;

        case 'fight-club':

            backgroundImage.style.background = 'url(img/fight-club-back.jpg) no-repeat top center'
            title.textContent = 'מועדון קרב';
            releaseDate.textContent = 1999;
            description.textContent = "דם וכאב הם מנת חלקם של הבחורים הצעירים שמגיעים למועדון הקרב - מועדון שמאפשר להם להאבק אחד בשני וכך לשחרר את המתחים של שבוע העבודה הקשה. טיילר (פיט) וקריין (נורתון) הם מקימי המועדון - אבל בעוד קריין מתחיל אבד את השפיות שלו ואת השליטה בחייו, טיילר הופך למודל להערצה בעיני כל באי המועדון - הכוח שלו בונה לו צבא של מאמינים שהכוונות שלו לא טהורות לגמרי."

            break;

        case 'shawshank-redemption':

            backgroundImage.style.background = 'url(img/shawshank-redemption-back.jpg) no-repeat top center'
            title.textContent = 'חומות של תקווה';
            releaseDate.textContent = 1994;
            description.textContent = 'אנדי (טים רובינס) נעצר בחשד לרצח אשתו ומאהבה, נשפט ונשלח לכלא "שאשנק" הידוע לשמצה, כשנראה שאין לו סיכוי לצאת משם, או אף לשרוד במקום. אבל הוא לומד להסתגל למציאות הקשוחה והאכזרית סביבו. הוא מתחבר עם רד (פרימן) אסיר ותיק שיושב כבר שנים רבות יודע משהו על חיי הכלא, על הצדק ועל החיים. החברות מחזיקה אותם בתנאים הקשים, וחוכמתו של אנדי אף מוציאה אותו מצרות ונותנת לו דרך להסתדר עם אנשי הסגל המרושעים ועם האסירים האלימים.';

            break;

        case 'rouge-one':

            backgroundImage.style.background = 'url(img/rouge-one-back.jpg) no-repeat top center'
            title.textContent = 'רוג אחת: סיפור מלחמת הכוכבים';
            releaseDate.textContent = 2016;
            description.textContent = 'רוג אחד: סיפור מלחמת הכוכבים הוא הסרט הראשון בסדרת סרטי מלחמת הכוכבים שתעמוד בפני עצמה מאולפני לוקאספילם. הסרט מספר את סיפורם של חבורת גיבורים לא צפויים המתאחדת כדי לקחת על עצמה את המשימה המסוכנת והכמעט בלתי אפשרית לגנוב את התוכניות של נשק הרסני.';

            break;

        case 'suicide-squad':

            backgroundImage.style.background = 'url(img/suicide-squad-back.jpg) no-repeat top center'
            title.textContent = "יחידת המתאבדים";
            releaseDate.textContent = 2016;
            description.textContent = "סוכנות ממשלתית סודית מגייסת את חבורת הנבלים האכזרית ביותר אשר כלואה בבית הסוהר בגות'האם, לביצוע משימת התאבדות של ממש. אם יצליחו במשימה וישארו בחיים – מבטיחה הסוכנות חנינה לכל הנבלים. מי ישרוד את המשימה והאם תעמוד הסוכנות במילתה לשחרר את הרוע ברחובות העיר?";

            break;

        case 'john-wick':

            backgroundImage.style.background = 'url(img/john-wick-back.jpg) no-repeat top center'
            title.textContent = "ג'ון וויק";
            releaseDate.textContent = 2014;
            description.textContent = 'כאשר רוצח שכיר בדימוס נאלץ לשוב בחזרה לעולם הפשע על ידי בריון צעיר וסדיסטי, הוא יוצא לצוד את יריביו בעזרת המיומנות והאכזריות שהפכה אותו לאגדה בעולם תחתון.';

            break;

            // Music
        case 'portugal':

            backgroundImage.style.background = 'url(img/portugal-back.jpg) no-repeat top center'
            title.innerHTML = 'Feel It Still';
            releaseDate.textContent = 2017;
            description.textContent = "פורטוגל. דה מאן הוקמה בשנת 2005 בפורטלנד, אורגון. חברי הלהקה הם ג'ון גורלי, זח קרודרס, קייל  אוקווין, נח גרש וקיין ריטצו'ט.";

            break;

        case 'havana':

            backgroundImage.style.background = 'url(img/havana-back.jpg) no-repeat top center'
            title.innerHTML = 'Havana';
            releaseDate.textContent = 2017;
            description.textContent = 'קרלה קמילה קביו אסטרבאו היא זמרת ופזמונאית אמריקאית מקובה. כחלק מלהקת הבנות Fifth Harmony, קביו והלהקה הוציאו מיני-אלבום אחד ושני אלבומי אולפן.';

            break;

        case 'thunder':

            backgroundImage.style.background = 'url(img/thunder-back.jpg) no-repeat top center'
            title.innerHTML = 'Thunder';
            releaseDate.textContent = 2017;
            description.textContent = "אימג'ין דרגונס היא להקת רוק אלטרנטיבי מלאס וגאס שבנבדה. הלהקה קיבלה חשיפה בעקבות אלבום הבכורה המצליח שלהם, Night Visions, שיצא לאור בספטמבר 2012 והגיע למקום השני במצעד האלבומים של ארצות הברית בילבורד 200.";

            break;

        case 'perfect':

            backgroundImage.style.background = 'url(img/perfect-back.jpg) no-repeat top center'
            title.innerHTML = 'Perfect';
            releaseDate.textContent = 2017;
            description.textContent = 'אדוארד כריסטופר "אד" שירן הוא זמר-יוצר ומלחין בריטי. ב-2012, זכה שירן בשני פרסי המוזיקה הבריטית בקטגוריות "אמן הסולו הבריטי הטוב ביותר" ו"האמן הבריטי פורץ הדרך".';

            break;

        case 'malone':

            backgroundImage.style.background = 'url(img/malone-back.jpg) no-repeat top center'
            title.innerHTML = 'Rockstar';
            releaseDate.textContent = 2017;
            description.textContent = "אוסטין ריצ'רד פוסט, הידוע בשם הבמה פוסט מלון, הוא ראפר, זמר, מלחין, מפיק וגיטריסט אמריקאי.";

            break;

        case 'sam-smith':

            backgroundImage.style.background = 'url(img/sam-smith-back.jpg) no-repeat top center'
            title.innerHTML = 'Too Good At Goodbyes';
            releaseDate.textContent = 2017;
            description.textContent = "סמואל פרדריק סמית' הוא זמר אנגלי שהתפרסם לראשונה כשהוציא את השיר 'Latch' שהגיע למקום ה-11 במצעד הסינגלים הבריטי. שיתוף הפעולה שלו עם הזמר Nauhgty Boy הוליד את השיר La La La שהוביל לפרסום בינלאומי, השיר הגיע למקומות הראשונים במצעדים העולמיים.";

            break;

            // Podcasts
        case 'notarbut':

            backgroundImage.style.background = 'url(img/notarbut-back.jpg) no-repeat top center'
            title.innerHTML = 'מפתחים חסרי תרבות';
            releaseDate.textContent = 2017;
            description.textContent = "פודקאסט על חיי היום יום בצוותי פיתוח. אנחנו מדברים על תרבות באירגוני פיתוח, שוברים מיתוסים, קרשים וכל מה שבא ליד.";
            break;

            // Books
        case 'toldot':

            backgroundImage.style.background = 'url(img/toldot-back.jpg) no-repeat top center'
            title.innerHTML = 'קיצור תולדות האנושות';
            releaseDate.textContent = 2011;
            description.textContent = "לפני מאה אלף שנים חיו בכדור הארץ לפחות שישה מינים שונים של אדם. לאף אחד מהם לא היתה חשיבות מיוחדת. תפקידם בטבע לא היה גדול מזה של גורילות, גחליליות או סוסוני ים.";
            break;

        case 'tomorrow':

            backgroundImage.style.background = 'url(img/tomorrow-back.jpg) no-repeat top center'
            title.innerHTML = 'ההיסטוריה של המחר';
            releaseDate.textContent = 2015;
            description.textContent = "זהו ספר שבוחן את זהותה של האנושות ואת חלומותיה, ומציע מבט מרענן ומפתיע על העולם של המאה ה–21.";
            break;

        case 'knock':

            backgroundImage.style.background = 'url(img/knock-back.jpg) no-repeat top center'
            title.innerHTML = 'פתאום דפיקה בדלת';
            releaseDate.textContent = 2010;
            description.textContent = "פתאום דפיקה בדלת הוא קובץ סיפורים קצרים מאת אתגר קרת, שיצא לאור בשנת 2010. זהו קובץ הסיפורים החמישי של קרת לאחר צנורות, געגועי לקיסינג'ר, הקייטנה של קנלר ואניהו, ומקבץ ראשון לאחר 8 שנים בהן פנה לעסוק בעיקר בכתיבת תסריטים לטלוויזיה, לקומיקס ולקולנוע.";
            break;

        case 'you-dont':

            backgroundImage.style.background = 'url(img/you-dont-back.jpg) no-repeat top center'
            title.innerHTML = "You Don't Know JS";
            releaseDate.textContent = 2015;
            description.textContent = "סדרת ספרים הצוללת לעומקם של המנגנונים שמאחורי שפת ג'ואווסקריפט.";
            break;

        case 'design-patterns':

            backgroundImage.style.background = 'url(img/design-patterns-back.jpg) no-repeat top center'
            title.innerHTML = 'JS Design Patterns';
            releaseDate.textContent = 2012;
            description.textContent = "בספר זה נלמד ליישם דפוסי עיצוב קלאסיים ומודרניים בשפת ג'אווסקריפט.";
            break;

        case 'los-logos':

            backgroundImage.style.background = 'url(img/los-logos-back.jpg) no-repeat top center'
            title.innerHTML = 'Los Logos';
            releaseDate.textContent = 2009;
            description.textContent = "לוס לוגוס מציג את ההתפתחויות האחרונות בתחום עיצוב הלוגו - הדיספלינה שמעצבת את זהותם של מותגים, חברות, ואישיויות.";
            break;

    }
}