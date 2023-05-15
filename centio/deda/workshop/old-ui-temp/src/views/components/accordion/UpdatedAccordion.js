// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const UpdatedAccordion = () => {
  // ** State
  const [open, setOpen] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  return (
    <Accordion className='accordion-border' open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Accordion Item 1</AccordionHeader>
        <AccordionBody accordionId='1'>
          Gummi bears toffee soufflé jelly carrot cake pudding sweet roll bear claw. Sweet roll gingerbread wafer
          liquorice cake tiramisu. Gummi bears caramels bonbon icing croissant lollipop topping lollipop danish.
          Marzipan tootsie roll bonbon toffee icing lollipop cotton candy pie gummies. Gingerbread bear claw chocolate
          cake bonbon. Liquorice marzipan cotton candy liquorice tootsie roll macaroon marzipan danish.
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  )
}
export default UpdatedAccordion
