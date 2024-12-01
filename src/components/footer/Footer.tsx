import {Box, Flex} from "@radix-ui/themes";

export default function Footer() {
  return (
      <Box asChild={true}>
          <footer className="bg-white w-full shadow  dark:bg-gray-800">
              <Flex justify={'between'} className="w-full mx-auto max-w-screen-xl p-4">
                  <Box className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                      Hecho en California.
                  </Box>
                  <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">About</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Contact</a>
                      </li>
                  </ul>
              </Flex>
          </footer>
      </Box>

  );
}