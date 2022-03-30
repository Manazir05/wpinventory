'CreditMaint'.maint({panelStyle: 'titled'})
'Add AR Entry'.title({when: 'adding'})
'Edit AR Entry'.title({when: 'editing'})
'Back'.action({act: 'cancel'})
'OK'.action({act: 'ok'})
'Save'.action({act: 'save'})
'Add another'.action({act: 'add'})
'Send Via Email'.action()
'Download PDF'.action()
'Attachments'.action({act: 'attachments'})

'Credit'.datatype()

'Entry Details'.panel()
'creditNumber'.field()
'customerName'.field({readOnly: true, showAsLink: true})
'date'.field()
'creditType'.field()
'dueDate'.field()
'amount'.field()
'paid'.field({yesOrNo: true})
'notes'.field({multiLine: true})

'Send Status'.panel()
'emailAddress'.field()
'emailed'.field({yesOrNo: true, readOnly: true})
'emailDate'.field({date: true, allowEmpty: true, readOnly: true})

'Download PDF'.availableWhen((credit, maint) => {
  if ( ! credit ) return false
  return credit.creditType === 'Invoice'
})

'Download PDF'.act(async (maint, credit) => {
  maint.downloadPDF({spec: "ARInvoicePdf.js", docName: credit.creditNumber + ".PDF"})
})

'Send Status'.visibleWhen((maint, credit) => {
  return credit.creditType === 'Invoice'
})

'Send Via Email'.availableWhen((credit, maint) => {
  if ( ! credit ) return false
  return credit.creditType === 'Invoice'
})

'Send Via Email'.act(async (maint, credit) => {
  try {
    await credit.sendViaEmail()
    maint.showMessage("Email was sent")
  } catch(e) {
    maint.showMessage("There was a problem sending the email:".translate() + " " + e.message)
    await global.foreman.doSave()
  }
})

'dueDate'.visibleWhen((maint, credit) => {
  return credit.creditType === 'Invoice'
})

'CreditMaint'.makeDestinationFor('Credit')

'customerName'.destination(async credit => {
  return await credit.referee('debtor')
})

'CreditMaint'.whenAdding(async function(credit, maint) {

  let defaultCreditNumber = async () => {
    let nextNo = await 'NextNumber'.bringOrCreate({forDatatype: 'Credit'})
    nextNo.number = nextNo.number + 1
    let noStr = nextNo.number + ""
    let no = "AR" + noStr.padStart(5, '0')
    maint.setFieldValue('creditNumber', no)
  }

  let getDebtor = async () => {
    let c = this.callerCast(); if ( ! c ) return null
    if ( c.datatype() === 'Debtor' )
      return c
    if ( c.toDebtor )
      return await c.toDebtor()
    return null
  }

  let refreshDebtor = async () => {
    let d = await getDebtor(); if ( ! d ) return
    let debtorRef = d.reference()
    credit.debtor = debtorRef
  }

  await refreshDebtor()
  await defaultCreditNumber()

})


