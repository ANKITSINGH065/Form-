import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const topicsList = [
  "Stack",
  "Recursion",
  "Tree",
  "Graph",
  "Array",
  "LinkedList",
];

const CodingContestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [solution, setSolution] = useState({
    language: "",
    file: null,
    code: "",
  });
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleTopicAdd = (topic) => {
    if (!topics.includes(topic)) {
      setTopics([...topics, topic]);
    }
    setSearchTerm("");
  };

  const handleTopicRemove = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const filteredTopics = topicsList.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      title,
      topics,
      difficulty,
      description,
      solution,
      testCases,
    });
  };

  return (
    <div className="py-8 bg-gray-900 text-gray-200 min-h-screen flex justify-center">
      <form
        className="w-[95vw] max-w-7xl p-8 bg-gray-800 shadow-md rounded-lg border-2 border-gray-700"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
              Topic
            </label>
            <input
              type="text"
              placeholder="Search and add topics..."
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-700 text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filteredTopics.length > 0) {
                  e.preventDefault();
                  handleTopicAdd(filteredTopics[0]);
                }
              }}
            />
            {searchTerm && (
              <div className="mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-md">
                {filteredTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                    onClick={() => handleTopicAdd(topic)}
                  >
                    {topic}
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap mt-4">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-900 text-blue-300 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full"
                >
                  {topic}
                  <button
                    type="button"
                    className="ml-2 text-red-400"
                    onClick={() => handleTopicRemove(topic)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
              Difficulty Level
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-700 text-gray-200"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
            Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-700 text-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
            Description
          </label>
          <Editor
            apiKey="12e6goehlis4xhkogig9scymb8y31y8ij0iqz2iyorfw14ho"
            value={description}
            onEditorChange={(content) => setDescription(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "image imagetools",
              ],
              toolbar:
                "undo redo | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | link image | removeformat",
              content_style:
                "body { background-color: white; color: black; }",
              image_advtab: true,
              automatic_uploads: true,
              file_picker_types: "image",
              images_upload_handler: function (blobInfo, success, failure) {
                success("data:image/jpeg;base64," + blobInfo.base64());
              },
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
            Share Your Solution
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 mb-4 bg-gray-700 text-gray-200"
            value={solution.language}
            onChange={(e) =>
              setSolution({ ...solution, language: e.target.value })
            }
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* Add more languages here */}
          </select>
          <div className="mb-4">
            <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg hover:bg-slate-100 inline-block">
              Choose File 📁
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setSolution({ ...solution, file: e.target.files[0] })
                }
              />
            </label>
            <p className="text-center text-gray-500 mt-2">or</p>
            <textarea
              placeholder="Write your code here..."
              className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 mt-2 bg-gray-700 text-gray-200"
              rows={6}
              value={solution.code}
              onChange={(e) =>
                setSolution({ ...solution, code: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-lg font-semibold mb-2 text-left">
            Test Cases
          </label>
          {testCases.map((testCase, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-400 text-sm font-semibold mb-1 text-left">
                Test Case {index + 1}
              </label>
              <textarea
                placeholder="Input"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 mb-2 bg-gray-700 text-gray-200"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
              />
              <textarea
                placeholder="Output"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-700 text-gray-200"
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(index, "output", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-slate-100"
            onClick={addTestCase}
          >
            Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CodingContestForm;
