import { useParams } from 'react-router-dom';
import PageHeader from '../banner/PageHeader';
import CaseIDHandle from './CaseIDHandle';

const CasePage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <PageHeader title='Open Case' />
            <CaseIDHandle id={id as string} />
        </>
    )
}

export default CasePage
