function emailCustom(emailSubj, emailBody, toAddr,
    fromAddr, contactType, licenseType
  ) {
    toAddr = typeof toAddr !== 'undefined' ? toAddr : "";
    fromAddr = typeof fromAddr !== 'undefined' ? fromAddr : "developmentservices@ashevillenc.gov";
    contactType = typeof contactType !== 'undefined' ? contactType : "";
    licenseType = typeof licenseType !== 'undefined' ? licenseType : "";
    var emailAddrs = [];

    if(toAddr != "") { emailAddrs.push(toAddr); }

    if(contactType != "") {
      var CapContacts = aa.people.getCapContactByCapID(capId);
      if (CapContacts.getSuccess()) {
        var ContactOutputs = CapContacts.getOutput();
        for (yy in ContactOutputs) {
          if(contactType.equals(ContactOutputs[yy].getCapContactModel().getPeople().getContactType())) { 
            if(ContactOutputs[yy].getEmail() != null) {
              emailAddrs.push(ContactOutputs[yy].getEmail());
            }
          }
        }
      }
    }

    //var profArr = getLicenseProfessional(capId);
    // DISABLED: InspectionResultSubmitAfter:79
    //if (profArr != null) {
    //	for(x in profArr) if(profArr[x].getEmail() + '' != '') email(profArr[x].getEmail(),'noreply@ashevillenc.gov','Inspection Resulted','You are a professional on permit '+capIDString+' An Inspection '+inspType+' was completed with a result of '+inspResult+'.<br>Inspection Comment: '+inspComment+'<br><br><br>Thank You.');
    //	}

    var emailString = emailAddrs.join(';') 
    if(emailString.indexOf("@") > 0) {
      aa.sendMail(fromAddr, emailString, toAddr, emailSubj, emailBody); 
      logDebug("Successfully sent emails");
    }else{
      logDebug("Couldn't send emails, invalid address");
    }
}

// WAYS TO CALL:
// emailCustom("Subj: Email All Contacts","Body of Email",{contactType:"ALL"});

// emailCustom("Email All Applicants","Body of Email",{contactType:"Applicant"});
// emailCustom("Email All General Contractors","Body of Email",{licenseType:"General Contractor"});
// emailCustom("Email All Contacts and Thana from donotreply","Body of Email",{
//   contactType:"ALL",
//   toAddr:"talley@ashevillenc.gov",
//   fromAddr:"donotreply@ashevillenc.gov"
// });
