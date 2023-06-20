import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FormFiled from "../components/FormField";
import Loader from "../components/Loader";

const RenderCards = ({ data, title }:any) => {
  if (data?.length > 0) {
    return (
      data.map((post:any) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<number>(0);
  const [searchedResults, setSearchedResults] = useState<any>();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert("aaaaaa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleSearchChange = (e:any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item:any) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="font-extravold text-[#222328] text-[32px]">Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Browse through a collection of image by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormFiled  labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange} />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center">
              <Loader/>
          </div>
        ):(
          <>
             {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
              {searchText?(
                <RenderCards data={searchedResults} title="No search results found"/>
              ):(
               <RenderCards data={allPosts} title={"No post found"}/> 
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
