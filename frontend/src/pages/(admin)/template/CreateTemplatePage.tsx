import { CreateTemplate, PageHeader } from '../../../components'

const CreateTemplatePage = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const case_id = searchParams.get('case_id') || '';

    return (
        <>
            <PageHeader title="Generate a Document" />
            <CreateTemplate case_id={case_id} />
        </>
    )
}

export default CreateTemplatePage
