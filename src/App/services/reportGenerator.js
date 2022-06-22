import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call

function getGrade(obt, ttl) {
  let avg = (obt / ttl) * 100;
  let grade;

  switch (true) {
    case avg >= 80:
      grade = "A";
      break;
    case avg >= 70:
      grade = "B";
      break;
    case avg >= 60:
      grade = "C";
      break;
    case avg >= 50:
      grade = "D";
      break;
    case avg < 50:
      grade = "F";
      break;
    default:
      break;
  }

  return grade;
}

// define a generatePDF function that accepts a tickets argument
const generatePDF = (tickets, school) => {


  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Subjects", "Obtain Marks", "Total Marks", "Grade"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach((ticket) => {
    const ticketData = [
      ticket?.exam_schedule_exam_scheduleToexam_submission?.school_course
        ?.course_name,
      ticket?.marks,
      ticket?.exam_schedule_exam_scheduleToexam_submission?.marks,
      getGrade(
        ticket?.marks,
        ticket?.exam_schedule_exam_scheduleToexam_submission?.marks
      ),
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 60 });
  // we use a date string to generate our filename.
  // ticket title. and margin-top + margin-left
  doc.text(school?.name, 100, 15);
  doc.text(school?.description, 70, 20);
  doc.text(school?.email, 85, 27);

  doc.text("Student Name: ", 20, 37);
  doc.text(tickets[0]?.school_student?.user?.user_name, 65, 37);

  doc.text("Class: ", 20, 47);
  doc.text(tickets[0]?.exam_schedule_exam_scheduleToexam_submission?.school_class_room?.cl_name, 40, 47);
  doc.text(tickets[0]?.exam_schedule_exam_scheduleToexam_submission?.class_section?.section_name, 70, 47);
  // we define the name of our PDF file.
  
  // doc.save(`report_${tickets[0]?.school_student?.user?.user_name}.pdf`);
  doc.output("dataurlnewwindow");

};

export default generatePDF;
