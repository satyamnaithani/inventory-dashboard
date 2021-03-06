import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
    <BootstrapSpinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
);
export default Spinner;