import { Modal, useModal, Button, Text } from '@nextui-org/react'

export const TermsModal = () => {
  const { setVisible, bindings } = useModal()
  return (
    <div>
      <Text
        css={{ cursor: 'pointer' }}
        color='secondary'
        onClick={() => setVisible(true)}
      >
        Política de privacidad y Términos y Condiciones
      </Text>
      <Modal
        scroll
        blur
        width='600px'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        css={{ cursor: 'text', pt: '25px' }}
        {...bindings}
      >
        <Modal.Header>
          <Text id='modal-title' size={18} h2>
            Política de privacidad y Términos y Condiciones
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text css={{ padding: '10px' }} id='modal-description'>
            Hemos adoptado esta Política de privacidad, que determina cómo
            procesamos la información recopilada por TalksUp, que también
            proporciona las razones por las que debemos recopilar ciertos datos
            personales sobre usted. Por lo tanto, debe leer esta Política de
            privacidad antes de utilizar el sitio web de TalksUp. <br />
            <br />
            Cuidamos sus datos personales y nos comprometemos a garantizar su
            confidencialidad y seguridad. <br />
            <br />
            Información personal que recopilamos: Cuando visita TalksUp,
            recopilamos automáticamente cierta información sobre su dispositivo,
            incluida información sobre su navegador web, zona horaria y algunas
            de las cookies instaladas en su dispositivo. Nos referimos a esta
            información recopilada automáticamente como &quot;Información del
            dispositivo&quot;. Además, podemos recopilar los datos personales
            que nos proporciona (incluidos, entre otros, Nombre, Apellido,
            Celular, etc.) durante el registro para poder cumplir con el
            acuerdo.
            <br />
            <br /> ¿Por qué tratamos sus datos? Nuestra principal prioridad es
            la seguridad de los datos del cliente y, como tal, podemos procesar
            solo los datos mínimos del usuario, solo en la medida en que sea
            absolutamente necesario para mantener el sitio web. La información
            recopilada automáticamente se usa solo para identificar posibles
            casos de abuso y establecer información estadística sobre el uso del
            sitio web. Esta información estadística no se agrega de otra manera
            de tal manera que identifique a cualquier usuario particular del
            sistema. <br />
            <br />
            Puede visitar el sitio web sin decirnos quién es ni revelar ninguna
            información mediante la cual alguien pueda identificarlo como una
            persona específica e identificable. Sin embargo, si desea utilizar
            algunas de las funciones del sitio web, o desea proporcionar otros
            detalles completando un formulario, puede proporcionarnos datos
            personales, como su correo electrónico, nombre, apellido, ciudad de
            residencia, organización, número de teléfono. Puede optar por no
            proporcionarnos sus datos personales, pero es posible que no pueda
            aprovechar algunas de las funciones del sitio web. Por ejemplo, no
            podrá contactarnos directamente desde el sitio web. Los usuarios que
            no estén seguros de qué información es obligatoria pueden
            comunicarse con nosotros a través de sebasvil20@gmail.com.
            <br />
            <br /> Tus derechos: Como usuario de TalksUp, tiene los siguientes
            derechos relacionados con sus datos personales: El derecho a ser
            informado. El derecho de acceso. El derecho a la rectificación. El
            derecho de supresión. El derecho a restringir el procesamiento. El
            derecho a la portabilidad de los datos. El derecho a oponerse.
            Derechos en relación con la toma de decisiones automatizada y
            elaboración de perfiles. Si desea ejercer este derecho, comuníquese
            con nosotros a través de la información de contacto a continuación.
            <br />
            <br /> Enlaces a otros sitios web: Nuestro sitio web puede contener
            enlaces a otros sitios web que no son de nuestra propiedad ni están
            controlados por nosotros. Tenga en cuenta que no somos responsables
            de dichos otros sitios web ni de las prácticas de privacidad de
            terceros. Lo alentamos a que tenga cuidado cuando abandone nuestro
            sitio web y lea las declaraciones de privacidad de cada sitio web
            que pueda recopilar información personal. <br />
            <br />
            Seguridad de información: Protegemos la información que proporciona
            en servidores informáticos en un entorno controlado y seguro,
            protegido contra el acceso, uso o divulgación no autorizados.
            Mantenemos medidas de seguridad administrativas, técnicas y físicas
            razonables para proteger contra el acceso, uso, modificación y
            divulgación de datos personales no autorizados bajo su control y
            custodia. Sin embargo, no se puede garantizar la transmisión de
            datos a través de Internet o de una red inalámbrica.
            <br />
            <br />
            Divulgación jurídica: Divulgaremos cualquier información que
            recopilemos, utilicemos o recibamos si así lo requiere o lo permite
            la ley, como para cumplir con una citación o un proceso legal
            similar, y cuando creamos de buena fe que la divulgación es
            necesaria para proteger nuestros derechos, proteger su seguridad o
            la seguridad de otros, investigar fraudes o responder a una
            solicitud del gobierno. <br />
            <br />
            Información del contacto: Si desea comunicarse con nosotros para
            obtener más información sobre esta Política o desea comunicarse con
            nosotros con respecto a cualquier asunto relacionado con los
            derechos individuales y su Información personal, puede enviar un
            correo electrónico a sebasvil20@gmail.com.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={() => setVisible(false)}>
            Cerrar
          </Button>
          <Button auto onClick={() => setVisible(false)}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
