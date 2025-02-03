
function extractData() {
let thescrapingofmapsresults = []

  document.querySelectorAll('.lI9IFe').forEach((div) => {
    const upperhead = div.querySelector(".y7PRA")
    const name = upperhead.querySelector('.NrDZNb')?.textContent || 'No name available';
    const rating = upperhead.querySelector('.AJB7ye .fontBodyMedium .MW4etd').textContent;
    const reviewsCount = upperhead.querySelector('.AJB7ye .fontBodyMedium .UY7F9').textContent;

    // Access the last element from the NodeList for phone
    // const phone = phoneelms.length > 0 ? phoneelms[phoneelms.length - 1].textContent.trim() : "No phone available";
    // let address = phoneelms.length > 1 ? phoneelms[phoneelms.length - 2].querySelector('span')?.textContent.trim() : "No address available";
    // address = address || "no address"
    // Access the last element from the NodeList
    // const phone = phoneelm[phoneelm.length - 1] || "no phone"
    

    // Correctly target the specific <a> element with the website URL

    thescrapingofmapsresults.push({ name,rating,reviewsCount });
  });
  console.log(thescrapingofmapsresults);
  // paginate();
  return thescrapingofmapsresults;
}


function finalizeDataCollection() {
let theresis = extractData();

  console.log("Final collected data:", theresis);
  const csvContent = convertArrayToCSV(theresis);
  downloadCSV(csvContent, 'extracted-data.csv');
}

function convertArrayToCSV(array) {
  if (array.length === 0) {
      return null;
  }
  const headers = Object.keys(array[0]).join(',');
  const rows = array.map(item =>
      Object.values(item).map(field =>
          `"${field.toString().replace(/"/g, '""')}"` // Properly escape double quotes
      ).join(',')
  );
  return [headers, ...rows].join('\n');
}

function downloadCSV(csvString, filename) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Example usage
finalizeDataCollection();
// You can run the extractData function on page load or based on some user actions
