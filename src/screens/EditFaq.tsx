import { useEffect, useState } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useEditFaqMutation, useGetAllFaqQuery } from '../redux/features/fag/faqApi';
import { styles } from '../components/styles/style';


type Props = {}

export default function EditFaq({ }: Props) {
  const { id } = useParams<{ id: string }>();
  const [editFaq, { isLoading, isSuccess, error }] = useEditFaqMutation({})
  const navigate = useNavigate()

  const { data: fetch, refetch } = useGetAllFaqQuery({}, { refetchOnMountOrArgChange: true })

  const faqDataFind = fetch && fetch.find((i: any) => i._id === id);

  useEffect(() => {
    if (faqDataFind) {
      setFaqInfo({

        name: faqDataFind?.name,
        description: faqDataFind?.description,

      })
      setFaqData(faqDataFind?.faq);
    }
  }, [faqDataFind])



  const [faqInfo, setFaqInfo] = useState({
    "name": "",
    "description": "",
  })
  const [faqData, setFaqData] = useState([{
    question: "",
    answer: ""
  }])

  const formattedFaqData = faqData.map((content) => ({
    question: content.question,
    answer: content.answer
  }));
  const data = {
    name: faqInfo.name,
    description: faqInfo.description,
    faq: formattedFaqData
  }

  const handleSubmit = async () => {
    const id = faqDataFind._id
    if (!isLoading) {
      await editFaq({ id, data })
    }
  }


  useEffect(() => {
    if (isSuccess) {
      toast.success("Faq created successfully")
      navigate("/admin/help-center")
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message)
      }
    }
  }, [isLoading, isSuccess, error])


  const addNewFAQ = () => {
    setFaqData([...faqData, { question: '', answer: '' }]);
  };

  const deleteFAQ = (index: any) => {
    const updatedFAQ = [...faqData];
    updatedFAQ.splice(index, 1);
    setFaqData(updatedFAQ);
  };

  const handleQuestionChange = (e: any, index: number) => {
    const updatedFAQ = faqData.map((faq, i) => 
      i === index ? { ...faq, question: e.target.value } : faq
    );
    setFaqData(updatedFAQ);
  };

  const handleAnswerChange = (e: any, index: number) => {
    const updatedFAQ = faqData.map((faq, i) => 
      i === index ? { ...faq, answer: e.target.value } : faq
    );
    setFaqData(updatedFAQ);
  };


  return (
    <div className=' bg-gray-900 rounded-md'>
    
      <div className='container p-4 m-auto'>
        <form onSubmit={handleSubmit} className={`${styles.label}`}>
          <div>
            <label className="text-gray-100" htmlFor=''>
              FAQ Title
            </label>
            <input
              type='name'
              name=''
              required
              value={faqInfo.name}
              onChange={(e: any) => setFaqInfo({ ...faqInfo, name: e.target.value })}
              id="name"
              placeholder='Faq title'
              className={`${styles.input}`}
            />
          </div>
          <div className='my-5'>
          <label className="text-gray-100" htmlFor=''>
              FAQ Description
            </label>
            <textarea name='' id='' cols={30} rows={2}
              placeholder='Write something nice...'
              value={faqInfo.description}
              onChange={(e: any) => setFaqInfo({ ...faqInfo, description: e.target.value })}
              className={`${styles.input} !h-min !py-2`}></textarea>
          </div>
          <br />
          <div>
      
            {faqData.map((faq: any, index: number) => (
              <div key={index} className='flex flex-col' >
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  className={`${styles.input}`}
                  onChange={(e) => handleQuestionChange(e, index)}
                />
                <textarea
                  placeholder="Answer"
                  className={`${styles.input} !h-min py-2`}
                  value={faq.answer}
                  onChange={(e) => handleAnswerChange(e, index)}
                />

                <div className='inline-block my-4'>
                  <p className='flex items-center text-[18px] dark:text-red-500 text-black cursor-pointer'
                    onClick={() => deleteFAQ(index)}>
                    <AiOutlineMinusCircle className="mr-2" />
                    Delete
                  </p>
                </div>

              </div>
            ))}
            <div className='inline-block mb-4'>
              <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                onClick={addNewFAQ}
              >
                <AiOutlinePlusCircle className="mr-2" />
                Add FAQ
              </p>
            </div>

          </div>
          <div className='w-full flex items-center justify-end'>
            <input
              type='submit'
              value="Update faq"
              className='w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer' />
          </div>
        </form>

      </div>
    </div>
  )
}