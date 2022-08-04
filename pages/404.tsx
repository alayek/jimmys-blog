import { NextPage } from 'next';
import CustomLink from '../components/common/CustomLink';
import Wrapper from '../components/common/wrapper';

const Custom404: NextPage = () => {
  return (
    <Wrapper title='Not found'>
      <div className='flex flex-col items-center space-y-2 mt-24'>
        <h1 className='text-6xl font-light'>404</h1>
        <p>
          <CustomLink href='/' replace mode='primary' underlined>
            Go To Home Page
          </CustomLink>
        </p>
        <p>Sorry, the content you are looking for could not be found.</p>
      </div>
    </Wrapper>
  );
};

export default Custom404;
