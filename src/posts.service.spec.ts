import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();
    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const initialPostsCount = (postsService as any).posts.length;

    const createdPost = postsService.create(post);

    const posts = (postsService as any).posts;

    expect(posts.length).toBe(initialPostsCount + 1);

    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();
    expect(createdPost.text).toBe(post.text);

    expect(createdPost.id).toBe("2");

    const foundPost = posts.find((p: Post) => p.id === createdPost.id);
    expect(foundPost).toBeDefined();
    expect(foundPost.text).toBe(post.text);
  });

  it("should find a post", () => {
    const targetPost = postsService.create({ text: "Target post" });

    const foundPost = postsService.find(targetPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(targetPost.id);
    expect(foundPost?.text).toBe("Target post");
    expect(foundPost?.date).toBe(targetPost.date);

    const posts = (postsService as any).posts;
    const postFromArray = posts.find((p: Post) => p.id === targetPost.id);
    expect(foundPost).toEqual(postFromArray);

    const nonExistentPost = postsService.find("999");
    expect(nonExistentPost).toBeUndefined();

    const preExistingPost = postsService.find("1");
    expect(preExistingPost).toBeDefined();
    expect(preExistingPost?.text).toBe("Some pre-existing post");
  });
});
